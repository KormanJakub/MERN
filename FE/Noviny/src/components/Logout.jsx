import { redirect } from "react-router-dom";

export async function action() {
  localStorage.removeItem("uiAppRole")
  localStorage.removeItem("uiAppToken");
  console.log("presiel sonm");

  return redirect("/login");
}
