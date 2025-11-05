'use client';

import { useRouter } from 'next/navigation';

interface Exam {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
  questions: Array<{ id: string; type: string; content: string }>;
  _count: { responses: number };
}

interface DashboardProps {
  exams: Exam[];
}

export function Dashboard({ exams }: DashboardProps) {
  const router = useRouter();

  const recentExams = exams.slice(0, 5);
  const activeExams = exams.filter(e => e.status === 'ACTIVE');
  const completedExams = exams.filter(e => e.status === 'COMPLETED');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your learning overview.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
            <div className="text-sm text-muted-foreground mb-1">Total Exams</div>
            <div className="text-3xl font-bold">{exams.length}</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
            <div className="text-sm text-muted-foreground mb-1">Active</div>
            <div className="text-3xl font-bold text-blue-600">{activeExams.length}</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
            <div className="text-sm text-muted-foreground mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-600">{completedExams.length}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Exams</h2>
            <button
              onClick={() => router.push('/exams/new')}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              New Exam
            </button>
          </div>

          {recentExams.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No exams yet</p>
              <button
                onClick={() => router.push('/exams/new')}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Your First Exam
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentExams.map(exam => (
                <div
                  key={exam.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/exams/${exam.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{exam.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{exam.questions.length} questions</span>
                        <span>•</span>
                        <span>{exam._count.responses} responses</span>
                        <span>•</span>
                        <span>{new Date(exam.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exam.status === 'ACTIVE'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : exam.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {exam.status}
                      </span>
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
