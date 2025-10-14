import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Lesson {
  id?: string;
  title: string;
  subject: string;
  duration: number;
  status: boolean;
  createdAt?: string;
  completed: boolean;
}

interface LessonState {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
}

const initialState: LessonState = {
  lessons: [],
  loading: false,
  error: null,
};

export const fetchLessons = createAsyncThunk<Lesson[]>(
  "lesson/fetchLessons",
  async () => {
    const response = await axios.get("http://localhost:3000/lessons");
    return response.data;
  }
);

export const addLesson = createAsyncThunk<
  Lesson,
  Lesson,
  { rejectValue: string }
>("lesson/addLesson", async (newLesson, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3000/lessons", newLesson);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateLesson = createAsyncThunk<
  Lesson,
  Lesson,
  { rejectValue: string }
>("lesson/updateLesson", async (lesson, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/lessons/${lesson.id}`,
      lesson
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteLesson = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("lesson/deleteLesson", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:3000/lessons/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    toggleComplete(state, action) {
      const lesson = state.lessons.find((l) => l.id === action.payload);
      if (lesson) {
        lesson.completed = !lesson.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Lỗi khi tải bài học";
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        state.lessons.push(action.payload);
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.map((l) =>
          l.id === action.payload.id ? action.payload : l
        );
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.filter((l) => l.id !== action.payload);
      });
  },
});

export const { toggleComplete } = lessonSlice.actions;
export default lessonSlice.reducer;