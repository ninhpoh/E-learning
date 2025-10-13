import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginPayload {
    email: string;
    password: string;
}

interface SignUpState {
    loading: boolean;
    error: string | null;
    success: boolean;
    user: any | null;
}

const initialState: SignUpState = {
    loading: false,
    error: null,
    success: false,
    user: null,
};

export const loginUser = createAsyncThunk<
    any,
    LoginPayload,
    { rejectValue: string }
>("signup/loginUser", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:3000/users");
        const users = response.data;

        const matchedUser = users.find(
            (user: any) => user.email === email && user.password === password
        );

        if (matchedUser) {
            return matchedUser;
        } else {
            return rejectWithValue("Email hoặc mật khẩu không đúng");
        }
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

const signUpSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        resetLoginStatus: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Đăng nhập thất bại";
            });
    },
});

export const { resetLoginStatus } = signUpSlice.actions;
export default signUpSlice.reducer;