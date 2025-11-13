import { prisma } from './db';
import { config } from './config';

export type SubscriptionPlan = 'FREE' | 'PRO' | 'ENTERPRISE';

interface PlanLimits {
  courses: number;
  aiRequests: number;
  storage: number;
  teamMembers: number;
}

export const getPlanLimits = (plan: SubscriptionPlan): PlanLimits => {
  return config.limits[plan.toLowerCase() as 'free' | 'pro' | 'enterprise'];
};

export const checkUsageLimit = async (
  userId: string,
  type: 'courses' | 'aiRequests' | 'storage' | 'teamMembers'
): Promise<{ allowed: boolean; current: number; limit: number; plan: SubscriptionPlan }> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      plan: true,
      aiRequestsUsed: true,
      storageUsed: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const limits = getPlanLimits(user.plan as SubscriptionPlan);
  let current = 0;

  switch (type) {
    case 'aiRequests':
      current = user.aiRequestsUsed;
      break;
    case 'storage':
      current = user.storageUsed;
      break;
    case 'courses':
    case 'teamMembers':
      // These would need separate queries
      current = 0; // Placeholder
      break;
  }

  const limit = limits[type];
  const allowed = limit === -1 || current < limit;

  return {
    allowed,
    current,
    limit,
    plan: user.plan as SubscriptionPlan,
  };
};

export const incrementUsage = async (
  userId: string,
  type: 'aiRequests' | 'storage',
  amount: number = 1
): Promise<void> => {
  const updateData: any = {};

  if (type === 'aiRequests') {
    updateData.aiRequestsUsed = { increment: amount };
  } else if (type === 'storage') {
    updateData.storageUsed = { increment: amount };
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  // Log usage
  await prisma.usageLog.create({
    data: {
      userId,
      type: type === 'aiRequests' ? 'AI_REQUEST' : 'STORAGE',
      count: amount,
    },
  });
};

export const resetMonthlyUsage = async (userId: string): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      aiRequestsUsed: 0,
      lastResetAt: new Date(),
    },
  });
};

export const upgradePlan = async (
  userId: string,
  newPlan: SubscriptionPlan,
  stripeSubscriptionId?: string
): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: newPlan,
      subscriptionId: stripeSubscriptionId,
      subscriptionStatus: 'ACTIVE',
    },
  });
};

export const cancelSubscription = async (userId: string): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: 'CANCELED',
    },
  });
};

export const isFeatureAvailable = (plan: SubscriptionPlan, feature: string): boolean => {
  const features = {
    FREE: ['basic_ai', 'flashcards', 'notes'],
    PRO: ['basic_ai', 'flashcards', 'notes', 'voice_input', 'calendar_export', 'analytics'],
    ENTERPRISE: ['basic_ai', 'flashcards', 'notes', 'voice_input', 'calendar_export', 'analytics', 'teams', 'api_access', 'custom_integration'],
  };

  return features[plan]?.includes(feature) || false;
};
