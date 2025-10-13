import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Subject {
  id?: string;
  title: string;
  status: boolean;
  createdAt?: string;
}

interface SubjectState {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
}

const initialState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
};

export const fetchSubjects = createAsyncThunk<Subject[]>(
  "subject/fetchSubjects",
  async () => {
    const response = await axios.get("http://localhost:3000/subjects");
    return response.data;
  }
);

export const addSubject = createAsyncThunk<
  Subject,
  Subject,
  { rejectValue: string }
>("subject/addSubject", async (newSubject, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3000/subjects", newSubject);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Lỗi khi tải môn học";
      })
      .addCase(addSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects.push(action.payload);
      })
      .addCase(addSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Lỗi khi thêm môn học";
      });
  },
});

export default subjectSlice.reducer;