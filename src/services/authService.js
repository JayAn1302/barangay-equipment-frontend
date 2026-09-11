import api from "../api/axios";

export const login = async (username, password) => {
  const response = await api.post("/Authentication/login", {
    username,
    password,
  });

  return response.data;
};

export const forgotPassword = async (username) => {
  const response = await api.post("/Authentication/forgot-password", {
    username,
  });

  return response.data;
};

export const resetPassword = async (username, token, newPassword) => {
  const response = await api.post("/Authentication/reset-password", {
    username,
    token,
    newPassword,
  });

  return response.data;
};