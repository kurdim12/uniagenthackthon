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

    // Get total AI requests
    const totalAIRequests = await prisma.usageLog.count({
      where: {
        userId,
        type: 'AI_REQUEST',
      },
    });

    // Get this week's activity
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weeklyActivity = await prisma.usageLog.groupBy({
      by: ['createdAt'],
      where: {
        userId,
        type: 'AI_REQUEST',
        createdAt: {
          gte: weekStart,
        },
      },
      _count: true,
    });

    // Format weekly activity by day
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const activityByDay = days.map((day, index) => {
      const dayDate = new Date(weekStart);
      dayDate.setDate(dayDate.getDate() + index);
      dayDate.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(dayDate);
      nextDay.setDate(nextDay.getDate() + 1);

      const count = weeklyActivity.filter((log) => {
        const logDate = new Date(log.createdAt);
        return logDate >= dayDate && logDate < nextDay;
      }).length;

      return {
        day,
        requests: count,
      };
    });

    // Calculate study hours (rough estimate: 1 hour per 10 AI requests)
    const studyHoursThisWeek = Math.round(
      activityByDay.reduce((sum, day) => sum + day.requests, 0) / 10
    );

    // Get course count (using exams as proxy)
    const coursesActive = await prisma.exam.groupBy({
      by: ['userId'],
      where: { userId },
      _count: true,
    });

    // Top courses (mock data - in production track by course)
    const topCourses = [
      { id: '1', name: 'Computer Science 101', requestCount: 45 },
      { id: '2', name: 'Calculus III', requestCount: 32 },
      { id: '3', name: 'World History', requestCount: 28 },
    ];

    // Calculate learning streak
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { streak: true },
    });

    // Mock achievements
    const achievements = [
      {
        id: '1',
        title: 'First Steps',
        icon: '🎯',
        unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        title: 'Study Streak',
        icon: '🔥',
        unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        title: 'AI Expert',
        icon: '🤖',
        unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    return NextResponse.json({
      totalAIRequests,
      studyHoursThisWeek,
      coursesActive: coursesActive.length || 3,
      averageGrade: 85,
      weeklyActivity: activityByDay,
      topCourses,
      learningStreak: user?.streak || 0,
      achievements,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
