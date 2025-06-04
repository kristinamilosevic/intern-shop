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
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#F2E2B1",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#BDB395",
          fontWeight: "bold",
          textDecoration: "none",
          fontSize: "20px",
        }}
      >
        Sell&Buy
      </Link>

      <div style={{ paddingRight: "40px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {user ? (
            <>
              <span style={{ color: "#BDB395" }}>loggedin: {user}</span>
              <Link to="/add" style={linkStyle}>
               + New Listing
              </Link>
              <button onClick={handleLogout} style={buttonStyle}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
              <Link to="/register" style={linkStyle}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#F6F0F0",
  backgroundColor: "#D5C7A3",
  padding: "6px 12px",
  borderRadius: "5px",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#BDB395",
  color: "#F6F0F0",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Navbar;
