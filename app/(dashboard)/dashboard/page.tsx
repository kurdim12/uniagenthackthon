'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { useStore } from '@/lib/store';

export default function DashboardPage() {
  const router = useRouter();
  const exams = useStore(state => state.exams);
  const user = useStore(state => state.getCurrentUser());
  const initialized = useStore(state => state.initialized);
  const initialize = useStore(state => state.initialize);

  useEffect(() => {
    if (!initialized) {
      initialize().catch((err: Error) => {
        console.error('Failed to initialize:', err);
      });
    }
  }, [initialized, initialize]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/select-account');
    return null;
  }

  return <Dashboard exams={exams} />;
}
