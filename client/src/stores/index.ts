import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slices/loginSlice';
import signUpReducer from "../slices/signUpSlice"
import subjectReducer from "../slices/SubjectTrackerSlice"
import subjectItemReducer from "../slices/SubjectItemSlice"
const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signUpReducer,
    subject: subjectReducer,
    subjectItem: subjectItemReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;