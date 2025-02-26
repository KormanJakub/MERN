import { Link, redirect, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";

const NavBar = () => {
  const token = useRouteLoaderData("root");
  const adminRole = localStorage.getItem("uiAppRole");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-400">
      <div className="container mx-auto p-4 flex justify-between items-center gap-5">
        <div
          className="text-white text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          NOVINY.SK
        </div>

        <div className="hidden md:flex flex-1 justify-center space-x-4">
          <Link
            to="/about"
            className="text-white hover:bg-gray-600 px-3 py-2 rounded"
          >
            About
          </Link>
          <Link
            to="/articles"
            className="text-white hover:bg-gray-600 px-3 py-2 rounded"
          >
            Articles
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-white hover:bg-gray-600 px-3 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:bg-gray-600 px-3 py-2 rounded"
              >
                Register
              </Link>
            </>
          ) : adminRole === "admin" ? (
            <>
              <Link
                to="/admin"
                className="text-white hover:bg-gray-600 px-3 py-2 rounded"
              >
                Admin
              </Link>
              <Button
                onClick={() => {
                  localStorage.removeItem("uiAppRole");
                  localStorage.removeItem("uiAppToken");

                  navigate("/");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to={`/user/`}
                className="text-white hover:bg-gray-600 px-3 py-2 rounded"
              >
                User
              </Link>
              <Button
                onClick={() => {
                  localStorage.removeItem("uiAppRole");
                  localStorage.removeItem("uiAppToken");

                  navigate("/");
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button
            className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <Link
            to="/about"
            className="block text-white hover:bg-gray-600 px-4 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/articles"
            className="block text-white hover:bg-gray-600 px-4 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Articles
          </Link>
          {!token ? (
            <>
              <Link
                to="/login"
                className="block text-white hover:bg-gray-600 px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-white hover:bg-gray-600 px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : adminRole === "admin" ? (
            <>
              <Link
                to="/admin"
                className="block text-white hover:bg-gray-600 px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                method="post"
                action="/logout"
                className="block text-white hover:bg-gray-600 px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/user/`}
                className="block text-white hover:bg-gray-600 px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                User
              </Link>
              <Link
                method="post"
                action="/logout"
                className="block text-white hover:bg-gray-600 px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Logout
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
