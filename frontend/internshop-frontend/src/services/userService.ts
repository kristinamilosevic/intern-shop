import axios from "axios";
import { User } from "../models/User";

const API_URL = "http://localhost:8080/api/users";

export const registerUser = async (user: User) => {
  const { username, password, phone } = user;
  const payload = { username, password, phoneNumber: phone };
  return axios.post(API_URL, payload);
};
