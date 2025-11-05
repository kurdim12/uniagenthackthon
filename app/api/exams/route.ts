import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireUserId } from '@/lib/session';
import { CreateExamSchema } from '@/lib/validators';

export async function GET() {
  try {
    const userId = await requireUserId();

    const exams = await prisma.exam.findMany({
      where: { userId },
      include: {
        questions: {
          select: {
            id: true,
            type: true,
            content: true,
          },
        },
        _count: {
          select: {
            responses: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ exams });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Failed to fetch exams' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await requireUserId();
    const body = await request.json();
    const { title, questions } = CreateExamSchema.parse(body);

    const exam = await prisma.exam.create({
      data: {
        userId,
        title,
        status: 'DRAFT',
        questions: {
          create: questions.map((q, index) => ({
            order: index,
            type: q.type,
            content: q.content,
            choices: q.choices ? q.choices : undefined,
            canonicalAnswer: q.canonicalAnswer,
            weight: q.weight,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json({ exam }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to create exam' },
      { status: 500 }
    );
  }
}
