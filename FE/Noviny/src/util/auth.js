import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("uiAppToken");
  return token;
};

export const tokenLoader = () => {
  return getAuthToken();
};

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }
  return 0;
}
