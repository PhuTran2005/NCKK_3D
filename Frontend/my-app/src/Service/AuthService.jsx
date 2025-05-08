// src/services/authService.js
const API_URL = "https://version-web-3d-64-5.onrender.com/auth/login"; // đổi URL theo backend của bạn

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  console.log(data);

  localStorage.setItem("token", data.token); // lưu token vào localStorage
  return data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const getToken = () => {
  return localStorage.getItem("token");
};

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export default {
  login,
  logout,
  getToken,
  isAuthenticated,
};
