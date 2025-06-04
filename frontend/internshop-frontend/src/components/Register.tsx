import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { registerUser } from "../services/userService";

const Register: React.FC = () => {
  const [user, setUser] = useState<User>(new User());
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    if (!user.username || !user.password) {
      setMessage("Username and password are required.");
      return false;
    }
    return true;
  };

  const areFieldsValid = () => {
    return user.username !== "" && user.password !== "" && user.phone !== "";
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
  
    if (!areFieldsValid()) {
      setMessage("All fields are required.");
      return;
    }
  
    try {
      await registerUser(user);
      setMessage("Registration successful!");
      setUser(new User());

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage("An error occurred while registering.");
      }
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
        Sign Up
      </h2>

      {message && (
        <p
          style={{
            color: message.toLowerCase().includes("success") ? "#4CAF50" : "#D32F2F",
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username" style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>
          Username
        </label>
        <input
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
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
          onFocus={e => (e.currentTarget.style.borderColor = "#BDB395")}
          onBlur={e => (e.currentTarget.style.borderColor = "#D5C7A3")}
        />

        <label htmlFor="password" style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
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
          onFocus={e => (e.currentTarget.style.borderColor = "#BDB395")}
          onBlur={e => (e.currentTarget.style.borderColor = "#D5C7A3")}
        />

        <label htmlFor="phone" style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
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
          onFocus={e => (e.currentTarget.style.borderColor = "#BDB395")}
          onBlur={e => (e.currentTarget.style.borderColor = "#D5C7A3")}
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
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#8C7B55";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "#BDB395";
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
