import { redirect } from "react-router-dom";
import { fetchPost } from "./api";

export async function action({ request }) {
  const formData = await request.formData();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const response = await fetchPost("/public/signIn", data);
    localStorage.setItem("uiAppToken", response.token);
    localStorage.setItem("uiAppRole", response.role);
    if (response.role === "admin") {
      return redirect("/admin");
    } else {
      return redirect("/");
    }
  } catch (error) {
    alert(error.message);
    return null;
  }
}
