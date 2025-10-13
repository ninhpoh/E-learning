// src/features/common-interface/subject/components/SubjectItemSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Subject {
  id: string;
  title: string;
  status: boolean;
  createdAt?: string
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

//  Lấy danh sách môn học
export const fetchSubjects = createAsyncThunk<Subject[]>(
  "subject/fetchSubjects",
  async () => {
    const response = await axios.get("http://localhost:3000/subjects");
    return response.data;
  }
);

//  Cập nhật môn học
export const updateSubject = createAsyncThunk<
  Subject,
  Subject,
  { rejectValue: string }
>("subject/updateSubject", async (subject, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/subjects/${subject.id}`,
      subject
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

//  Xóa môn học
export const deleteSubject = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("subject/deleteSubject", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:3000/subjects/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const subjectItemSlice = createSlice({
  name: "subjectItem",
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

      .addCase(updateSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })

      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter((s) => s.id !== action.payload);
      });
  },
});

export default subjectItemSlice.reducer;