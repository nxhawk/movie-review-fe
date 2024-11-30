import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import LogInPage from "../pages/LogInPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import PrivateRoute from "../layout/private/PrivateRoute";
import UserProfilePage from "../pages/UserProfilePage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <UserProfilePage />,
          },
        ],
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LogInPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
