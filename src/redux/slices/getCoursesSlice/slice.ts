import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import coursesAxios from '../../../api/coursesAxios';
import { RootState } from '../../store';

type FetchLastCoursesType = {
  courses: [];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type MainPageParams = {
  lastCourses: [];
  status: Status;
};

const initialState: MainPageParams = {
  lastCourses: [],
  status: Status.LOADING,
};

export const fetchingCourses = createAsyncThunk<FetchLastCoursesType>(
  'mainPage/GetLastCourses',
  async () => {
    const { data } = await coursesAxios('');

    return data;
  },
);

export const GetCoursesSlice = createSlice({
  name: 'GetLastCourses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchingCourses.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchingCourses.fulfilled, (state, action) => {
      state.lastCourses = action.payload.courses;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchingCourses.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const {} = GetCoursesSlice.actions;

export const lastCoursesSelect = (state: RootState) => state.getCourses.lastCourses;

export default GetCoursesSlice.reducer;
