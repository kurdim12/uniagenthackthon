import { create } from 'zustand';
import { dashboardSlice, DashboardSlice } from './slices/dashboard';
import { examSlice, ExamSlice } from './slices/exam';
import { timerSlice, TimerSlice } from './slices/timer';

export type StoreState = DashboardSlice & ExamSlice & TimerSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...dashboardSlice(...a),
  ...examSlice(...a),
  ...timerSlice(...a),
}));
