import path from "./path";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
import ScrollToTop from "../hooks/useScrollToTop";
import PrivateRoute from "../layout/private/PrivateRoute";

import LogInPage from "../pages/LogInPage";
import UserProfileLayout from "../layout/UserProfileLayout.tsx";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import ResendEmailVerifyPage from "../pages/ResendEmailVerifyPage";
import SearchPage from "../pages/SearchPage.tsx";
import FullCastOfMoviePage from "../pages/FullCastOfMoviePage";
import PersonProfilePage from "../pages/PersonProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import FullReviewOfMoviePage from "../pages/FullReviewOfMoviePage";
import FavoriteMoviePage from "../pages/FavoriteMoviePage.tsx";
import RatingPage from "../pages/RatingPage.tsx";

// watchlist
import WatchListPage from "../pages/watchlist/WatchListPage.tsx";
import NewWatchListPage from "../pages/watchlist/NewWatchListPage.tsx";
import WatchListDetailPage from "../pages/watchlist/WatchListDetailPage.tsx";
import EditWatchListPage from "../pages/watchlist/EditWatchListPage.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <UserProfileLayout />,
            children: [
              {
                path: path.FAVORITE,
                element: <FavoriteMoviePage />,
              },
              {
                path: path.RATING,
                element: <RatingPage />,
              },
            ],
          },
          {
            path: path.WATCHLIST,
            children: [
              {
                element: <UserProfileLayout />,
                children: [
                  {
                    index: true,
                    element: <WatchListPage />,
                  },
                ],
              },
              {
                path: path.NEW,
                element: <NewWatchListPage />,
              },
            ],
          },
        ],
      },
      {
        element: (
          <ScrollToTop>
            <Outlet />
          </ScrollToTop>
        ),
        children: [
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
              {
                path: path.FULL_REVIEWS,
                element: <FullReviewOfMoviePage />,
              },
            ],
          },
          {
            path: path.SEARCH_MOVIE,
            element: <SearchPage />,
          },
          // Person
          {
            path: path.PERSON_DETAILS,
            element: <PersonProfilePage />,
          },
          {
            path: path.OTHER,
            element: <NotFoundPage />,
          },
          // watchlist details
          {
            path: path.WATCHLIST_DETAIL,
            children: [
              {
                index: true,
                element: <WatchListDetailPage />,
              },
              { path: path.EDIT, element: <EditWatchListPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
