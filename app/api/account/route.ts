import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUserId } from '@/lib/session';
import { getPlanLimits } from '@/lib/subscription';

export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        plan: true,
        subscriptionStatus: true,
        trialEndsAt: true,
        aiRequestsUsed: true,
        storageUsed: true,
        _count: {
          select: {
            exams: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const limits = getPlanLimits(user.plan as any);

    return NextResponse.json({
      plan: user.plan,
      status: user.subscriptionStatus,
      trialEndsAt: user.trialEndsAt,
      usage: {
        aiRequests: {
          current: user.aiRequestsUsed,
          limit: limits.aiRequests,
        },
        storage: {
          current: user.storageUsed,
          limit: limits.storage,
        },
        courses: {
          current: user._count.exams, // Using exams as proxy for courses
          limit: limits.courses,
        },
      },
    });
  } catch (error) {
    console.error('Account API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account data' },
      { status: 500 }
    );
  }
}
