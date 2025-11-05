import { NextRequest, NextResponse } from 'next/server';
import { AnalyzeSchema } from '@/lib/validators';
import { analyzeResponse } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, response, answer } = AnalyzeSchema.parse(body);

    const result = await analyzeResponse(question, response, answer);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}
