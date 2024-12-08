import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import LogInPage from "../pages/LogInPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import PrivateRoute from "../layout/private/PrivateRoute";
import UserProfilePage from "../pages/UserProfilePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import path from "../constants/path";

const router = createBrowserRouter([
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
    ],
  },
]);

export default router;
