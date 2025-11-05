import { StateCreator } from 'zustand';

const DEFAULT_DURATION = 1500; // 25 minutes in seconds
const MIN_DURATION = 900; // 15 minutes
const MAX_DURATION = 3000; // 50 minutes
const ADAPTIVENESS = 0.5;

export interface TimerSlice {
  timer: {
    remaining: number;
    baseDuration: number;
    isActive: boolean;
    start: () => void;
    pause: () => void;
    reset: () => void;
    adapt: (direction: 'up' | 'down', score?: number) => void;
  };
}

export const timerSlice: StateCreator<TimerSlice> = set => ({
  timer: {
    remaining: DEFAULT_DURATION,
    baseDuration: DEFAULT_DURATION,
    isActive: false,

    start: () => {
      set(state => ({
        timer: { ...state.timer, isActive: true },
      }));
    },

    pause: () => {
      set(state => ({
        timer: { ...state.timer, isActive: false },
      }));
    },

    reset: () => {
      set(state => ({
        timer: {
          ...state.timer,
          remaining: state.timer.baseDuration,
          isActive: false,
        },
      }));
    },

    adapt: (direction, score) => {
      set(state => {
        let adjustment = direction === 'up' ? 30 : -30;

        if (score !== undefined) {
          if (score < 0.4) {
            adjustment = -Math.round(state.timer.baseDuration * ADAPTIVENESS * 0.2);
          } else if (score > 0.7) {
            adjustment = Math.round(state.timer.baseDuration * ADAPTIVENESS * 0.1);
          }
        }

        const newDuration = Math.max(
          MIN_DURATION,
          Math.min(MAX_DURATION, state.timer.baseDuration + adjustment)
        );

        return {
          timer: {
            ...state.timer,
            baseDuration: newDuration,
            remaining: newDuration,
          },
        };
      });
    },
  },
});
