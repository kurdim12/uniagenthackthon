import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '../session';
import { checkUsageLimit } from '../subscription';

export async function checkAIUsageLimit(request: NextRequest): Promise<NextResponse | null> {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { allowed, current, limit, plan } = await checkUsageLimit(userId, 'aiRequests');

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Usage limit reached',
          message: `You've reached your ${plan} plan limit of ${limit} AI requests this month. Please upgrade to continue.`,
          current,
          limit,
          plan,
          upgradeUrl: '/pricing',
        },
        { status: 429 }
      );
    }

    return null; // Allow request to proceed
  } catch (error) {
    console.error('Usage limit check error:', error);
    return null; // Allow request to proceed on error
  }
}

export async function checkStorageLimit(
  request: NextRequest,
  fileSize: number
): Promise<NextResponse | null> {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { allowed, current, limit, plan } = await checkUsageLimit(userId, 'storage');

    if (!allowed || current + fileSize > limit) {
      return NextResponse.json(
        {
          error: 'Storage limit reached',
          message: `This upload would exceed your ${plan} plan storage limit. Please upgrade or delete some files.`,
          current,
          limit,
          plan,
          upgradeUrl: '/pricing',
        },
        { status: 429 }
      );
    }

    return null; // Allow request to proceed
  } catch (error) {
    console.error('Storage limit check error:', error);
    return null; // Allow request to proceed on error
  }
}
