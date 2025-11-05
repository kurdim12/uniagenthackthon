import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUserId } from '@/lib/session';
import { SubmitResponseSchema } from '@/lib/validators';
import { analyzeResponse } from '@/lib/ai';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await requireUserId();
    const body = await request.json();
    const { examId, questionId, content } = SubmitResponseSchema.parse(body);

    if (examId !== params.id) {
      return NextResponse.json(
        { error: 'Exam ID mismatch' },
        { status: 400 }
      );
    }

    const exam = await prisma.exam.findUnique({
      where: { id: examId, userId },
    });

    if (!exam) {
      return NextResponse.json(
        { error: 'Exam not found' },
        { status: 404 }
      );
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId, examId },
    });

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const response = await prisma.response.upsert({
      where: {
        userId_examId_questionId: {
          userId,
          examId,
          questionId,
        },
      },
      create: {
        userId,
        examId,
        questionId,
        content,
      },
      update: {
        content,
      },
    });

    const analysisResult = await analyzeResponse(
      question.content,
      content,
      question.canonicalAnswer || undefined
    );

    const analysis = await prisma.analysis.upsert({
      where: { responseId: response.id },
      create: {
        responseId: response.id,
        score: analysisResult.score,
        feedback: analysisResult.feedback,
        model: analysisResult.model,
      },
      update: {
        score: analysisResult.score,
        feedback: analysisResult.feedback,
        model: analysisResult.model,
      },
    });

    return NextResponse.json({
      response: {
        id: response.id,
        content: response.content,
        createdAt: response.createdAt,
      },
      analysis: {
        score: analysis.score,
        feedback: analysis.feedback,
        model: analysis.model,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    console.error('Submit response error:', error);
    return NextResponse.json(
      { error: 'Failed to submit response' },
      { status: 500 }
    );
  }
}
