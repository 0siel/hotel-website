import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if auth token exists in localStorage
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Remove auth token and update state
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <header className="bg-white text-fffcf3 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="San Felipe Logo"
          className="h-10 object-contain"
        />

        {/* Burger Menu Icon */}
        <button
          className="text-black block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-white z-50 md:block md:static md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 px-4 md:px-0 py-4 md:py-0">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 text-center hover:text-a79c69 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="block py-2 px-4 text-center hover:text-a79c69 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Eventos
              </Link>
            </li>

            <li>
              <Link
                to="/reservations"
                className="block py-2 px-4 text-center hover:text-a79c69 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Reservar
              </Link>
            </li>
            {!isLoggedIn ? (
              <li>
                <Link
                  to="/login"
                  className="block py-2 px-4 text-center hover:text-a79c69 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Ingresar
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="block py-2 px-4 text-center hover:text-a79c69 transition duration-200"
                >
                  Salir
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
