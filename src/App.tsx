import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ExamLayout from "./components/ExamLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Home from "./pages/homePage/Home";
import Courses from "./pages/coursePage/Courses";
import ExamList from "./pages/coursePage/ExamList";
import { ExamPage } from "./pages/coursePage/ExamDetail";

import Login from "./pages/loginPage/Login";
import Register from "./pages/loginPage/Register";
import ForgotPassword from "./pages/loginPage/ForgotPassword";
import Profile from "./pages/profilePage/Profile";
import ScrollToTop from "./components/ScrollToTop";
import { useDarkMode } from "./hooks/useDarkMode";

export default function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/:courseId"
            element={
              <ProtectedRoute>
                <ExamList />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route element={<ExamLayout />}>
          <Route
            path="/exam/:examId"
            element={
              <ProtectedRoute>
                <ExamPage
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
