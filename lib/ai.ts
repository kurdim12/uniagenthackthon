import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

interface AnalysisResult {
  score: number;
  feedback: string;
  model: string;
}

export async function analyzeResponse(
  question: string,
  userResponse: string,
  canonicalAnswer?: string
): Promise<AnalysisResult> {
  if (!openai) {
    return heuristicAnalysis(question, userResponse, canonicalAnswer);
  }

  try {
    const prompt = canonicalAnswer
      ? `Question: ${question}

Canonical Answer: ${canonicalAnswer}

Student Response: ${userResponse}

Evaluate the student's response against the canonical answer. Provide a score (0.0 to 1.0) and brief feedback. Return JSON: {"score": number, "feedback": string}`
      : `Question: ${question}

Student Response: ${userResponse}

Evaluate the student's response quality, clarity, and completeness. Provide a score (0.0 to 1.0) and brief feedback. Return JSON: {"score": number, "feedback": string}`;

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an educational assessment AI. Provide constructive feedback.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content || '{}';
    const result = JSON.parse(content);

    return {
      score: Math.max(0, Math.min(1, result.score || 0)),
      feedback: result.feedback || 'No feedback available.',
      model: AI_MODEL,
    };
  } catch (error) {
    console.error('AI analysis failed:', error);
    return heuristicAnalysis(question, userResponse, canonicalAnswer);
  }
}

function heuristicAnalysis(
  question: string,
  userResponse: string,
  canonicalAnswer?: string
): AnalysisResult {
  const responseLength = userResponse.trim().length;
  
  if (responseLength === 0) {
    return {
      score: 0,
      feedback: 'No response provided.',
      model: 'heuristic',
    };
  }

  let score = 0.5;
  const feedback: string[] = [];

  if (responseLength < 20) {
    score -= 0.2;
    feedback.push('Response is very brief.');
  } else if (responseLength > 200) {
    score += 0.1;
    feedback.push('Good detail provided.');
  }

  if (canonicalAnswer) {
    const answerWords = canonicalAnswer.toLowerCase().split(/\s+/);
    const responseWords = userResponse.toLowerCase().split(/\s+/);
    const matchingWords = answerWords.filter(w => responseWords.includes(w));
    const matchRatio = matchingWords.length / answerWords.length;
    
    score += matchRatio * 0.3;
    
    if (matchRatio > 0.5) {
      feedback.push('Key concepts identified.');
    } else {
      feedback.push('Consider reviewing the key concepts.');
    }
  } else {
    if (responseLength > 100) {
      score += 0.2;
    }
    feedback.push('Response evaluated for completeness.');
  }

  score = Math.max(0, Math.min(1, score));

  return {
    score,
    feedback: feedback.join(' ') || 'Response received.',
    model: 'heuristic',
  };
}

export async function analyzePRENAnswers(
  answers: Array<{ questionId: string; selectedOptionId: string; scores: Record<string, number> }>
): Promise<{
  practicalScore: number;
  reflectiveScore: number;
  experimentalScore: number;
  narrativeScore: number;
  dominantStyle: string;
}> {
  let totalPractical = 0;
  let totalReflective = 0;
  let totalExperimental = 0;
  let totalNarrative = 0;
  let totalWeight = 0;

  answers.forEach(answer => {
    const weight = 1;
    totalPractical += (answer.scores.practical || 0) * weight;
    totalReflective += (answer.scores.reflective || 0) * weight;
    totalExperimental += (answer.scores.experimental || 0) * weight;
    totalNarrative += (answer.scores.narrative || 0) * weight;
    totalWeight += weight;
  });

  const practicalScore = (totalPractical / totalWeight) * 100;
  const reflectiveScore = (totalReflective / totalWeight) * 100;
  const experimentalScore = (totalExperimental / totalWeight) * 100;
  const narrativeScore = (totalNarrative / totalWeight) * 100;

  const scores = {
    practical: practicalScore,
    reflective: reflectiveScore,
    experimental: experimentalScore,
    narrative: narrativeScore,
  };

  const dominantStyle = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
  )[0];

  return {
    practicalScore,
    reflectiveScore,
    experimentalScore,
    narrativeScore,
    dominantStyle,
  };
}
