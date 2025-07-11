import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Buttons";
import { login } from "../services/authService";

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
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);

      setSuccess("Login successful!");
      navigate("/");
      window.dispatchEvent(new Event("storage"));
    } catch (err: any) {
      setError(err.message || "Error connecting to the server");
    }
  };

  return (
    <div className="max-w-[400px] mx-auto my-[60px] p-[30px] bg-[#F6F0F0] rounded-[12px] shadow-[0_6px_18px_rgba(189,179,149,0.3)] text-[#8E806A] font-sans">
      <h2 className="text-center mb-[25px] font-bold text-2xl">Login</h2>

      {error && (
        <p className="text-center text-[#D32F2F] mb-[20px] font-semibold">{error}</p>
      )}

      {success && (
        <p className="text-center text-[#388E3C] mb-[20px] font-semibold">{success}</p>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="font-semibold block mb-[6px]">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-[10px] mb-[18px] rounded-[8px] border-[1.5px] border-[#D5C7A3] bg-[#F2E2B1] text-[#5C533F] text-base focus:outline-none focus:border-[#BDB395] transition-colors"
        />

        <label htmlFor="password" className="font-semibold block mb-[6px]">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-[10px] mb-[25px] rounded-[8px] border-[1.5px] border-[#D5C7A3] bg-[#F2E2B1] text-[#5C533F] text-base focus:outline-none focus:border-[#BDB395] transition-colors"
        />

        <Button
          type="submit"
          variant="primary"
          size="large"
          className="w-full font-bold text-[1.1rem] py-[12px] rounded-[10px] cursor-pointer shadow-[0_5px_12px_rgba(189,179,149,0.6)]"
        >
          Login
        </Button>
      </form>
      <div className="text-center mt-4 text-[#5C533F]">
        <span>Don't have an account? </span>
        <a
          href="/register"
          className="text-[#C2B092] font-semibold hover:underline"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default Login;
