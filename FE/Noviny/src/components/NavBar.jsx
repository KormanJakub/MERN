import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";

const NavBar = ({ onSelect }) => {

  const token = useRouteLoaderData("root");
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/");
  };

  return (
    <nav>
      <div className="flex gap-5 justify-content-between bg-gray-400 pr-4 pl-4">
        <div className="flex gap-5">
          <p className="cursor-pointer" onClick={navigateHandler}>NOVINY.SK</p>
          <p className="cursor-pointer" navTo="/about">
            <Link to="/about">About</Link></p>
          <p className="cursor-pointer">
            <Link to="/articles">Articles</Link>
          </p>
        </div>
        <div className="flex justify gap-5 justify-content-center">
          <p className="cursor-pointer">
            <Link to="/admin">Admin</Link></p>
          <p className="cursor-pointer">User</p>
          <p className="cursor-pointer"><Link to="/login">Login</Link></p>
          <p className="cursor-pointer"><Link to="/register">Register</Link></p>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
