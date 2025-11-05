'use client';

import { useEffect } from 'react';
import { useStore } from '@/store';
import { QuestionCard } from './QuestionCard';
import { SmartTimer } from '../timer/SmartTimer';

interface Question {
  id: string;
  type: string;
  content: string;
  choices?: Array<{ id: string; text: string }>;
  canonicalAnswer?: string;
  weight: number;
}

interface ExamFlowProps {
  examId: string;
  questions: Question[];
}

export function ExamFlow({ examId, questions }: ExamFlowProps) {
  const {
    currentQuestionIndex,
    responses,
    analyses,
    loading,
    setExam,
    submitResponse,
    nextQuestion,
    previousQuestion,
  } = useStore(state => state.exam);

  useEffect(() => {
    setExam(examId, questions);
  }, [examId, questions, setExam]);

  if (questions.length === 0) {
    return <div className="text-center py-12">No questions available</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const currentResponse = responses[currentQuestion?.id];
  const currentAnalysis = analyses[currentQuestion?.id];

  const handleSubmit = async (content: string) => {
    if (!currentQuestion) return;
    await submitResponse(currentQuestion.id, content);
  };

  const handleTimerExpire = () => {
    if (currentResponse) {
      nextQuestion();
    }
  };

  if (!currentQuestion) {
    return <div className="text-center py-12">Loading question...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Exam Progress</h2>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <SmartTimer
            key={currentQuestion.id}
            questionId={currentQuestion.id}
            onExpire={handleTimerExpire}
          />
        </div>

        <div className="mb-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          onSubmit={handleSubmit}
          loading={loading}
          response={currentResponse}
          analysis={currentAnalysis}
        />

        {currentAnalysis && (
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-lg p-6 border">
            <h3 className="font-semibold mb-2">Feedback</h3>
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-muted-foreground">Score:</span>
                <span className="font-bold text-lg">
                  {Math.round(currentAnalysis.score * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    currentAnalysis.score >= 0.7
                      ? 'bg-green-500'
                      : currentAnalysis.score >= 0.4
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${currentAnalysis.score * 100}%` }}
                />
              </div>
            </div>
            <p className="text-sm">{currentAnalysis.feedback}</p>
            {currentAnalysis.model && (
              <p className="text-xs text-muted-foreground mt-2">
                Analyzed by: {currentAnalysis.model}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={!currentAnalysis && currentQuestionIndex < questions.length - 1}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLastQuestion ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
