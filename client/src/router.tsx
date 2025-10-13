import { createBrowserRouter } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import SignUp from "../src/features/SignUp/SignUp";
import StdTrackerLayOut from "./layouts/SubjectLayOut";
import LogIn from "./features/LogIn/LogIn";
import SubjectTracker from "./features/common-interface/subject/SubjectTracker";
import LessonTracker from "./features/common-interface/lesson/LessonTracker";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/manager",
    element: <StdTrackerLayOut />,
    children : [
      {
        path: "subject",
        element: <SubjectTracker />,
      },
      {
        path: "lesson",
        element: <LessonTracker/>,
      }
    ],
  },
]);
