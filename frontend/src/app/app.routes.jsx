import { createBrowserRouter, Navigate } from "react-router-dom";
import Protected from "../features/auth/components/Protected";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/chat/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
]);
