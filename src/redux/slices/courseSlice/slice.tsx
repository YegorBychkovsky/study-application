import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import coursesAxios from '../../../api/coursesAxios';
import { CourseType } from '../courseSlice/types';
import { RootState } from '../../store';

type FetchCourseByIdType = {
  courses: CourseType;
};
type FetchCourseByIdParams = {
  id: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type CoursePageParams = {
  course: CourseType | undefined;
  courseId: string;
  status: Status;
  firstVideo: string;
};

const initialState: CoursePageParams = {
  course: undefined,
  courseId: '',
  firstVideo: '',
  status: Status.LOADING,
};

export const fetchingCourseById = createAsyncThunk<CourseType, FetchCourseByIdParams>(
  'mainPage/GetCourseById',
  async (params) => {
    const { id } = params;
    const { data } = await coursesAxios(`/${id}`);

    return data;
  },
);

export const GetCourseByIdSlice = createSlice({
  name: 'GetCourseById',
  initialState,
  reducers: {
    addCourseId(state, action: PayloadAction<string>) {
      state.courseId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchingCourseById.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchingCourseById.fulfilled, (state, action) => {
      state.course = action.payload;
      state.firstVideo = action.payload.lessons[0].link;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchingCourseById.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { addCourseId } = GetCourseByIdSlice.actions;

export const courseSelect = (state: RootState) => state.course.course;
export const courseIdSelect = (state: RootState) => state.course.courseId;
export const firstVideoSelect = (state: RootState) => state.course.firstVideo;

export default GetCourseByIdSlice.reducer;
