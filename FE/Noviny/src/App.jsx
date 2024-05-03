import { Fragment, useCallback, useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import AboutPage from "./pages/AboutPage";
import ArticleBrowserPage from "./pages/ArticleBrowserPage";
import AdminPage from "./pages/AdminPage";
import ArticlePage from "./pages/ArticlePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddArticlePage from "./pages/AddArticlePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import { action as loginAction } from "./util/loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: tokenLoader,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "articles",
        element: <ArticleBrowserPage />,
      },
      {
        path: "add-article",
        element: <AddArticlePage />,
      },
      {
        path: "articles/:art_id",
        element: <ArticlePage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        login: "login",
        element: <LoginPage />,
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
