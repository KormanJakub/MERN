import { useNavigate } from "react-router-dom";

export function logout() {
  const navigate = useNavigate();

  localStorage.removeItem("uiAppRole")
  localStorage.removeItem("uiAppToken");

  navigate("/login");
}
