'use client';

import { useRouter } from 'next/navigation';
import type { Exam } from '@/lib/types';

interface DashboardProps {
  exams: Exam[];
}

export function Dashboard({ exams }: DashboardProps) {
  const router = useRouter();

  const recentExams = exams.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your learning overview.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
            <div className="text-sm text-muted-foreground mb-1">Total Exams</div>
            <div className="text-3xl font-bold">{exams.length}</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
            <div className="text-sm text-muted-foreground mb-1">Upcoming</div>
            <div className="text-3xl font-bold text-blue-600">{exams.filter(e => new Date(e.startAt) > new Date()).length}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Exams</h2>
          </div>

          {recentExams.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No exams scheduled yet</p>
              <p className="text-sm text-muted-foreground">Check your courses for upcoming exams</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentExams.map(exam => (
                <div
                  key={exam.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{exam.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>📅 {new Date(exam.startAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>⏰ {new Date(exam.startAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <span>•</span>
                        <span className="capitalize">{exam.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
