import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const SubmitResponseSchema = z.object({
  examId: z.string().min(1, 'Exam ID is required'),
  questionId: z.string().min(1, 'Question ID is required'),
  content: z.string().min(1, 'Response content is required'),
});

export const AnalyzeSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  response: z.string().min(1, 'Response is required'),
  answer: z.string().optional(),
});

export const CreateExamSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  questions: z.array(z.object({
    type: z.enum(['MCQ', 'OPEN_ENDED']),
    content: z.string().min(1),
    choices: z.array(z.object({
      id: z.string(),
      text: z.string(),
    })).optional(),
    canonicalAnswer: z.string().optional(),
    weight: z.number().min(0).max(1).default(1.0),
  })).min(1, 'At least one question is required'),
});
