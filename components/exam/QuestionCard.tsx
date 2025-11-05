'use client';

import { useState } from 'react';

interface Choice {
  id: string;
  text: string;
}

interface Question {
  id: string;
  type: string;
  content: string;
  choices?: Choice[];
}

interface QuestionCardProps {
  question: Question;
  onSubmit: (content: string) => Promise<void>;
  loading: boolean;
  response?: string;
  analysis?: {
    score: number;
    feedback: string;
    model?: string;
  };
}

export function QuestionCard({
  question,
  onSubmit,
  loading,
  response,
  analysis,
}: QuestionCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<string>(response || '');
  const [openEndedResponse, setOpenEndedResponse] = useState<string>(response || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = question.type === 'MCQ' ? selectedChoice : openEndedResponse;
    if (!content.trim()) return;
    await onSubmit(content);
  };

  const isSubmitted = !!analysis;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-4" id={`question-${question.id}`}>
            {question.content}
          </label>

          {question.type === 'MCQ' && question.choices ? (
            <div className="space-y-3" role="radiogroup" aria-labelledby={`question-${question.id}`}>
              {question.choices.map(choice => (
                <label
                  key={choice.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedChoice === choice.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                  } ${isSubmitted ? 'cursor-not-allowed opacity-75' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={choice.id}
                    checked={selectedChoice === choice.id}
                    onChange={e => setSelectedChoice(e.target.value)}
                    disabled={isSubmitted}
                    className="mr-3 h-4 w-4"
                    aria-label={choice.text}
                  />
                  <span>{choice.text}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              value={openEndedResponse}
              onChange={e => setOpenEndedResponse(e.target.value)}
              disabled={isSubmitted}
              rows={6}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-gray-700 disabled:opacity-75 disabled:cursor-not-allowed"
              placeholder="Type your answer here..."
              aria-labelledby={`question-${question.id}`}
            />
          )}
        </div>

        {!isSubmitted && (
          <button
            type="submit"
            disabled={loading || (question.type === 'MCQ' ? !selectedChoice : !openEndedResponse.trim())}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'Submitting...' : 'Submit Answer'}
          </button>
        )}
      </form>
    </div>
  );
}
