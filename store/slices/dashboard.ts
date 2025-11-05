import { StateCreator } from 'zustand';

interface Exam {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
  questions: Array<{ id: string; type: string; content: string }>;
  _count: { responses: number };
}

export interface DashboardSlice {
  dashboard: {
    exams: Exam[];
    loading: boolean;
    error: string | null;
    loadExams: () => Promise<void>;
  };
}

export const dashboardSlice: StateCreator<DashboardSlice> = set => ({
  dashboard: {
    exams: [],
    loading: false,
    error: null,
    loadExams: async () => {
      set(state => ({
        dashboard: { ...state.dashboard, loading: true, error: null },
      }));

      try {
        const response = await fetch('/api/exams');
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized');
          }
          throw new Error('Failed to load exams');
        }

        const data = await response.json();
        
        set(state => ({
          dashboard: {
            ...state.dashboard,
            exams: data.exams || [],
            loading: false,
          },
        }));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set(state => ({
          dashboard: { ...state.dashboard, loading: false, error: message },
        }));
        throw error;
      }
    },
  },
});
