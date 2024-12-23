import path from "./path";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
import ScrollToTop from "../hooks/useScrollToTop";
import PrivateRoute from "../layout/private/PrivateRoute";

import LogInPage from "../pages/LogInPage";
import UserProfilePage from "../pages/UserProfilePage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import ResendEmailVerifyPage from "../pages/ResendEmailVerifyPage";
import SearchMoviePage from "../pages/SearchMoviePage";
import FullCastOfMoviePage from "../pages/FullCastOfMoviePage";
import PersonProfilePage from "../pages/PersonProfilePage";

const router = createBrowserRouter([
  {
    element: (
      <ScrollToTop>
        <Outlet />
      </ScrollToTop>
    ),
    children: [
      {
        element: <Layout />,
        children: [
          {
            element: <PrivateRoute />,
            children: [
              {
                path: path.PROFILE,
                element: <UserProfilePage />,
              },
            ],
          },
          // Home page
          {
            path: path.HOME,
            element: <HomePage />,
          },

          // Authentication
          {
            path: path.LOGIN,
            element: <LogInPage />,
          },
          {
            path: path.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: path.RESET_PASSWORD,
            element: <ResetPasswordPage />,
          },
          {
            path: path.REGISTER,
            element: <RegisterPage />,
          },
          {
            path: path.RESEND_EMAIL_VERIFYCATION,
            element: <ResendEmailVerifyPage />,
          },
          // Movies
          {
            path: path.MOVIE_DETAILS,
            children: [
              {
                index: true,
                element: <MovieDetailsPage />,
              },
              {
                path: path.CAST,
                element: <FullCastOfMoviePage />,
              },
            ],
          },
          {
            path: path.SEARCH_MOVIE,
            element: <SearchMoviePage />,
          },
          // Person
          {
            path: path.PERSON_DETAILS,
            element: <PersonProfilePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
