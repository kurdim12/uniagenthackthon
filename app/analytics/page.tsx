'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Brain, BookOpen, Target, Clock, Award
} from 'lucide-react';

interface AnalyticsData {
  totalAIRequests: number;
  studyHoursThisWeek: number;
  coursesActive: number;
  averageGrade: number;
  weeklyActivity: Array<{
    day: string;
    requests: number;
  }>;
  topCourses: Array<{
    id: string;
    name: string;
    requestCount: number;
  }>;
  learningStreak: number;
  achievements: Array<{
    id: string;
    title: string;
    icon: string;
    unlockedAt: string;
  }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  const stats = [
    {
      title: 'AI Requests',
      value: data.totalAIRequests,
      icon: Brain,
      color: 'from-purple-600 to-pink-600',
      suffix: ' total',
    },
    {
      title: 'Study Hours',
      value: data.studyHoursThisWeek,
      icon: Clock,
      color: 'from-blue-600 to-cyan-600',
      suffix: ' hrs this week',
    },
    {
      title: 'Active Courses',
      value: data.coursesActive,
      icon: BookOpen,
      color: 'from-green-600 to-emerald-600',
      suffix: ' courses',
    },
    {
      title: 'Learning Streak',
      value: data.learningStreak,
      icon: Award,
      color: 'from-orange-600 to-red-600',
      suffix: ' days',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Learning Analytics</h1>
          <p className="text-muted-foreground">Track your progress and study patterns</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl inline-block mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-1">
                  {stat.value}
                  <span className="text-lg font-normal text-muted-foreground">{stat.suffix}</span>
                </h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-8"
        >
          <h2 className="text-xl font-bold mb-6">Weekly Activity</h2>
          <div className="flex items-end justify-between gap-4 h-64">
            {data.weeklyActivity.map((day, index) => {
              const maxRequests = Math.max(...data.weeklyActivity.map(d => d.requests));
              const height = (day.requests / maxRequests) * 100;
              
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="w-full bg-gradient-to-t from-primary to-purple-600 rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {day.requests} requests
                    </div>
                  </motion.div>
                  <span className="text-xs text-muted-foreground font-medium">{day.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Courses & Achievements */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-xl font-bold mb-6">Most Studied Courses</h2>
            <div className="space-y-4">
              {data.topCourses.map((course, index) => (
                <div key={course.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{course.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.requestCount} AI requests
                    </div>
                  </div>
                  <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(course.requestCount / data.topCourses[0].requestCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-xl font-bold mb-6">Recent Achievements</h2>
            <div className="space-y-4">
              {data.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800"
                >
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
