import { StateCreator } from 'zustand';

interface Question {
  id: string;
  type: string;
  content: string;
  choices?: Array<{ id: string; text: string }>;
  canonicalAnswer?: string;
  weight: number;
}

interface Analysis {
  score: number;
  feedback: string;
  model?: string;
}

export interface ExamSlice {
  exam: {
    examId: string | null;
    questions: Question[];
    currentQuestionIndex: number;
    responses: Record<string, string>;
    analyses: Record<string, Analysis>;
    loading: boolean;
    setExam: (examId: string, questions: Question[]) => void;
    submitResponse: (questionId: string, content: string) => Promise<void>;
    nextQuestion: () => void;
    previousQuestion: () => void;
  };
}

export const examSlice: StateCreator<ExamSlice> = set => ({
  exam: {
    examId: null,
    questions: [],
    currentQuestionIndex: 0,
    responses: {},
    analyses: {},
    loading: false,

    setExam: (examId, questions) => {
      set(state => ({
        exam: {
          ...state.exam,
          examId,
          questions,
          currentQuestionIndex: 0,
          responses: {},
          analyses: {},
        },
      }));
    },

    submitResponse: async (questionId, content) => {
      set(state => ({
        exam: { ...state.exam, loading: true },
      }));

      try {
        const examId = (set as any).getState?.()?.exam?.examId;
        if (!examId) throw new Error('No active exam');

        const response = await fetch(`/api/exams/${examId}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ examId, questionId, content }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit response');
        }

        const data = await response.json();

        set(state => ({
          exam: {
            ...state.exam,
            responses: {
              ...state.exam.responses,
              [questionId]: content,
            },
            analyses: {
              ...state.exam.analyses,
              [questionId]: data.analysis,
            },
            loading: false,
          },
        }));
      } catch (error) {
        set(state => ({
          exam: { ...state.exam, loading: false },
        }));
        throw error;
      }
    },

    nextQuestion: () => {
      set(state => ({
        exam: {
          ...state.exam,
          currentQuestionIndex: Math.min(
            state.exam.currentQuestionIndex + 1,
            state.exam.questions.length - 1
          ),
        },
      }));
    },

    previousQuestion: () => {
      set(state => ({
        exam: {
          ...state.exam,
          currentQuestionIndex: Math.max(state.exam.currentQuestionIndex - 1, 0),
        },
      }));
    },
  },
});
