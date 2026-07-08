import api from "../api/axios";

export const login = async (username, password) => {
  const response = await api.post("/Authentication/login", {
    username,
    password,
  });

  return response.data;
};