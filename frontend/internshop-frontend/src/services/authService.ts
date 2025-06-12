import { User } from "../models/User";

const BASE_URL = process.env.REACT_APP_API_BASE_URL 
const API_URL = `${BASE_URL}/users`;

interface LoginResponse {
  token: string;
  user: {
    username: string;
  };
}


export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Login failed");
  }

  const data: LoginResponse = await response.json();
  return data;
};

export const registerUser = async (user: User): Promise<void> => {
  const { username, password, phoneNumber } = user;
  const payload = { username, password, phoneNumber };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = "User registration failed";
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
    }
    throw new Error(errorMessage);
  }
};
