import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

//HOTOVO

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
