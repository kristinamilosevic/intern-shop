import { User } from "../models/User";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${BASE_URL}/users`;

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



export const fetchUserIdByUsername = async (username: string): Promise<number> => {
  const response = await fetch(`${API_URL}/by-username/${username}`);

  if (!response.ok) {
    throw new Error("User fetch failed");
  }

  const data = await response.json();
  return data.id;
};
