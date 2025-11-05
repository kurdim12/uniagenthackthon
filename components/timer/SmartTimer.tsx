'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/store';

interface SmartTimerProps {
  questionId: string;
  onExpire: () => void;
}

export function SmartTimer({ questionId, onExpire }: SmartTimerProps) {
  const { remaining, isActive, start, pause, reset, adapt } = useStore(
    state => state.timer
  );
  const [displayTime, setDisplayTime] = useState(remaining);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setDisplayTime(remaining);
  }, [remaining]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setDisplayTime((prev: number) => {
          const next = prev - 1;
          if (next <= 0) {
            pause();
            onExpire();
            return 0;
          }
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, pause, onExpire]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (isActive) {
          pause();
        } else {
          start();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, start, pause]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const progress = ((remaining - displayTime) / remaining) * 100;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
              className="text-primary transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-mono font-bold">{formatTime(displayTime)}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={isActive ? pause : start}
              className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90 text-sm transition-colors"
              aria-label={isActive ? 'Pause timer' : 'Start timer'}
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={reset}
              className="px-3 py-1 border rounded hover:bg-gray-50 dark:hover:bg-slate-700 text-sm transition-colors"
              aria-label="Reset timer"
            >
              Reset
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => adapt('down')}
              className="px-2 py-1 text-xs border rounded hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              aria-label="Decrease timer duration"
            >
              −30s
            </button>
            <button
              onClick={() => adapt('up')}
              className="px-2 py-1 text-xs border rounded hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              aria-label="Increase timer duration"
            >
              +30s
            </button>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Space</kbd> to pause/resume
      </p>
    </div>
  );
}
