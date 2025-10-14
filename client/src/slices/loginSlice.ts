import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id?: number;
  hoTenDem: string;
  name: string;
  email: string;
  password: string;
}

interface LoginState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: LoginState = {
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("login/registerUser", async (userData, { rejectWithValue }) => {
  try {

    const existingUsers = await axios.get("http://localhost:3000/users");

    const emailExists = existingUsers.data.some(
      (user: User) => user.email === userData.email
    );

    if (emailExists) {
      return rejectWithValue("Email đã tồn tại. Vui lòng dùng email khác.");
    }

    // 3. Nếu không trùng → đăng ký
    const response = await axios.post("http://localhost:3000/users", userData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Đã xảy ra lỗi";
      });
  },
});

export const { resetStatus } = loginSlice.actions;
export default loginSlice.reducer;