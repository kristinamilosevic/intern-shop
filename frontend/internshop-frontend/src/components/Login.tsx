import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const msg = await response.text();
        setError(msg || "Login failed");
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);

      setSuccess("Login successful!");

      navigate("/");

      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      setError("Error connecting to the server");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "60px auto",
        padding: "30px",
        backgroundColor: "#F6F0F0",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(189,179,149,0.3)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#5C533F",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px", fontWeight: "700" }}>
        Login
      </h2>

      {error && (
        <p
          style={{
            color: "#D32F2F",
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            color: "#388E3C",
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="username"
          style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: "18px",
            borderRadius: "8px",
            border: "1.5px solid #D5C7A3",
            backgroundColor: "#F2E2B1",
            fontSize: "1rem",
            color: "#5C533F",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#BDB395")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#D5C7A3")}
        />

        <label
          htmlFor="password"
          style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: "25px",
            borderRadius: "8px",
            border: "1.5px solid #D5C7A3",
            backgroundColor: "#F2E2B1",
            fontSize: "1rem",
            color: "#5C533F",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#BDB395")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#D5C7A3")}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#BDB395",
            color: "#F6F0F0",
            fontWeight: "700",
            fontSize: "1.1rem",
            padding: "12px 0",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 5px 12px rgba(189,179,149,0.6)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#8C7B55";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#BDB395";
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
