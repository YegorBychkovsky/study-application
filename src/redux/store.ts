import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import getCourses from './slices/getCoursesSlice/slice';
import course from './slices/courseSlice/slice';

export const store = configureStore({
  reducer: {
    getCourses,
    course,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
