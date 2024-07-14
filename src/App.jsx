import React from "react";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

/* imports pages */
import SignInForm from "./pages/SignInForm.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DocumentDetail from "./pages/DocumentDetail.jsx";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "/",
          element: <SignInForm />,
        },
        {
          path: "/login",
          element: <SignInForm />,
        },
        {
          path: "/register",
          element: <RegisterForm />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/document/:id", // Rute dinamis untuk detail dokumen
          element: <DocumentDetail />,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
