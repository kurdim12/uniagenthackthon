'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { useStore } from '@/store';

export default function DashboardPage() {
  const router = useRouter();
  const { loadExams, exams, loading, error } = useStore(state => state.dashboard);

  useEffect(() => {
    loadExams().catch(err => {
      console.error('Failed to load dashboard:', err);
      if (err.message === 'Unauthorized') {
        router.push('/auth/login');
      }
    });
  }, [loadExams, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => loadExams()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard exams={exams} />;
}
