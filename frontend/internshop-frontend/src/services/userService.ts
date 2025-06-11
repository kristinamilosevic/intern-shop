import axios from "axios";
import { User } from "../models/User";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${BASE_URL}/users`; 

export const registerUser = async (user: User) => {
  const { username, password, phone } = user;
  const payload = { username, password, phoneNumber: phone };
  return axios.post(API_URL, payload);
};

export const fetchUserIdByUsername = async (username: string): Promise<number> => {
  const response = await fetch(`${API_URL}/by-username/${username}`);

  if (!response.ok) {
    throw new Error("User fetch failed");
  }

  const data = await response.json();
  return data.id;
};
