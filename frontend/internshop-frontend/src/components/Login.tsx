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

      const userResponse = await fetch(`http://localhost:8080/api/users/by-username/${data.user.username}`);
      if (userResponse.ok) {
        const userData = await userResponse.json();
        localStorage.setItem("userId", userData.id.toString());
        console.log("User ID saved to localStorage:", userData.id);
      } else {
        console.error("Failed to fetch user ID");
      }

      setSuccess("Login successful!");
      navigate("/");
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      setError("Error connecting to the server");
    }
  };

  return (
    <div className="max-w-[400px] mx-auto my-[60px] p-[30px] bg-[#F6F0F0] rounded-[12px] shadow-[0_6px_18px_rgba(189,179,149,0.3)] text-[#5C533F] font-sans">
      <h2 className="text-center mb-[25px] font-bold text-2xl">Login</h2>

      {error && (
        <p className="text-center text-[#D32F2F] mb-[20px] font-semibold">{error}</p>
      )}

      {success && (
        <p className="text-center text-[#388E3C] mb-[20px] font-semibold">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="font-semibold block mb-[6px]">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-[10px] mb-[18px] rounded-[8px] border-[1.5px] border-[#D5C7A3] bg-[#F2E2B1] text-[#5C533F] text-base focus:outline-none focus:border-[#BDB395] transition-colors"
        />

        <label htmlFor="password" className="font-semibold block mb-[6px]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-[10px] mb-[25px] rounded-[8px] border-[1.5px] border-[#D5C7A3] bg-[#F2E2B1] text-[#5C533F] text-base focus:outline-none focus:border-[#BDB395] transition-colors"
        />

        <button
          type="submit"
          className="w-full bg-[#BDB395] text-[#F6F0F0] font-bold text-[1.1rem] py-[12px] rounded-[10px] cursor-pointer shadow-[0_5px_12px_rgba(189,179,149,0.6)] transition-colors duration-300 hover:bg-[#8C7B55]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
