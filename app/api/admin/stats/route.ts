import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/session';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    // Get total users
    const totalUsers = await prisma.user.count({
      where: { isDemo: false },
    });

    // Get active subscriptions
    const activeSubscriptions = await prisma.user.count({
      where: {
        isDemo: false,
        subscriptionStatus: 'ACTIVE',
      },
    });

    // Get users by plan
    const usersByPlan = await prisma.user.groupBy({
      by: ['plan'],
      where: { isDemo: false },
      _count: true,
    });

    const planCounts = {
      FREE: 0,
      PRO: 0,
      ENTERPRISE: 0,
    };

    usersByPlan.forEach((group) => {
      planCounts[group.plan as keyof typeof planCounts] = group._count;
    });

    // Calculate monthly revenue (simplified - in production use Stripe)
    const monthlyRevenue = (planCounts.PRO * 9.99) + (planCounts.ENTERPRISE * 49.99);

    // Get AI requests today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const aiRequestsToday = await prisma.usageLog.count({
      where: {
        type: 'AI_REQUEST',
        createdAt: {
          gte: today,
        },
      },
    });

    // Get recent signups (last 10)
    const recentSignups = await prisma.user.findMany({
      where: { isDemo: false },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        createdAt: true,
      },
    });

    // Revenue chart (last 6 months)
    const revenueChart = generateRevenueChart();

    return NextResponse.json({
      totalUsers,
      activeSubscriptions,
      monthlyRevenue: Math.round(monthlyRevenue),
      aiRequestsToday,
      usersByPlan: planCounts,
      recentSignups,
      revenueChart,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}

function generateRevenueChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, index) => ({
    month,
    revenue: Math.round(1000 + (index * 500) + Math.random() * 500),
  }));
}
