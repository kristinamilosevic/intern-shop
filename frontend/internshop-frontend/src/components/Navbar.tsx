import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const updateUserFromStorage = () => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername && storedUsername !== "undefined" && storedUsername !== "null") {
        setUser(storedUsername);
      } else {
        setUser(null);
      }
    };

    updateUserFromStorage();

    window.addEventListener("storage", updateUserFromStorage);

    return () => {
      window.removeEventListener("storage", updateUserFromStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#F2E2B1] px-5 py-2 flex justify-between items-center z-[1000] shadow-md">
      <Link
        to="/"
        className="text-[#BDB395] font-bold text-lg no-underline"
      >
        Sell&Buy
      </Link>

      <div className="pr-10">
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-[#BDB395]">loggedin: {user}</span>
              <Link
                to="/add"
                className="bg-[#D5C7A3] text-[#F6F0F0] px-3 py-1 rounded no-underline hover:bg-[#b0a67e] transition"
              >
                + New Listing
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#BDB395] text-[#F6F0F0] px-3 py-1 rounded cursor-pointer hover:bg-[#a09a73] transition border-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-[#D5C7A3] text-[#F6F0F0] px-3 py-1 rounded no-underline hover:bg-[#b0a67e] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#D5C7A3] text-[#F6F0F0] px-3 py-1 rounded no-underline hover:bg-[#b0a67e] transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
