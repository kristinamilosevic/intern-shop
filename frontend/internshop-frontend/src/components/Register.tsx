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
    setUser((prev) => ({ ...prev, [name]: value }));
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
    <div className="max-w-md mx-auto mt-16 p-8 bg-[#F6F0F0] rounded-xl shadow-lg font-sans text-[#5C533F]">
      <h2 className="text-center mb-6 font-extrabold text-2xl">Sign Up</h2>

      {message && (
        <p
          className={`text-center mb-5 font-semibold ${
            message.toLowerCase().includes("success")
              ? "text-green-600"
              : "text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="username"
          className="block font-semibold mb-1"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-5 rounded-lg border-2 border-[#D5C7A3] bg-[#F2E2B1] text-[#5C533F] text-base outline-none focus:border-[#BDB395] transition"
        />

        <label
          htmlFor="password"
          className="block font-semibold mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-5 rounded-lg border-2 border-[#D5C7A3] bg-[#F2E2B1] text-[#5C533F] text-base outline-none focus:border-[#BDB395] transition"
        />

        <label
          htmlFor="phone"
          className="block font-semibold mb-1"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-7 rounded-lg border-2 border-[#D5C7A3] bg-[#F2E2B1] text-[#5C533F] text-base outline-none focus:border-[#BDB395] transition"
        />

        <button
          type="submit"
          className="w-full bg-[#BDB395] text-[#F6F0F0] font-bold text-lg py-3 rounded-xl shadow-md hover:bg-[#8C7B55] transition-colors duration-300 cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
