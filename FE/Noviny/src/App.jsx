import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticleBrowserPage from "./pages/ArticleBrowserPage";
import AdminPage from "./pages/AdminPage";
import ArticlePage from "./pages/ArticlePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddArticlePage from "./pages/AddArticlePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import { checkAdmin, checkAuthLoader, tokenLoader } from "./util/auth";
import { action as loginAction } from "./util/loaders";
import { action as logoutAction } from "./components/Logout";
import ErrorPage from "./components/ErrorPage";
import UserPage from "./pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
        action: checkAuthLoader,
      },
      {
        path: "add-article",
        element: <AddArticlePage />,
        action: checkAuthLoader,
      },
      {
        path: "articles/:art_id",
        element: <ArticlePage />,
        action: checkAuthLoader,
      },
      {
        path: "admin",
        element: <AdminPage />,
        loader: checkAdmin,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "logout",
        action: () => {
          localStorage.removeItem("uiAppRole");
          localStorage.removeItem("uiAppToken");
          console.log("presiel sonm");

          return redirect("/login");
        },
      },
      {
        path: "user/:userId",
        element: <UserPage />,
        action: checkAuthLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
