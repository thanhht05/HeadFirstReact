import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import User from "./components/User";
import Product from "./components/Books";
import TodoApp from "./components/TodoApp";
import UserPage from "./pages/UserPage";
import ProductTable from "./components/ProductList";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthWrapper } from "./components/context/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";
import BookPage from "./pages/BookPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/users",
        element: <UserPage />,
      },

      {
        path: "/books",
        element: (
          <PrivateRoute>
            <BookPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: <ProductTable />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        index: true,
        element: <TodoApp />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />,
  </AuthWrapper>,
  // </StrictMode>,
);
