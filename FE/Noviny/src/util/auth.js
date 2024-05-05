import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  return localStorage.getItem("uiAppToken");
};

export const getAdmin = () => {
  return localStorage.getItem("uiAppRole");
};

export const tokenLoader = () => {
  return getAuthToken();
};

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  return null;
};

export function checkAdmin() {
  const authData = getAdmin();

  if (authData !== "admin") {
    return redirect("/");
  }

  return null;
};