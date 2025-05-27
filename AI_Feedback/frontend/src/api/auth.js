import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/v1/users", // use your backend base URL
  withCredentials: true, // important for cookies
});

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
export const getProfile = () => API.get("/profile");
export const logout = () => API.get("/logout");
