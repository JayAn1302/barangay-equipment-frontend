import api from "../api/axios";

export const getUsers = async () => {
    const response = await api.get("/Users");
    return response.data;
};

export const createUser = async (data) => {
    const response = await api.post("/Users", data);
    return response.data;
};

export const updateUser = async (id, data) => {
    const response = await api.put(`/Users/${id}`, data);
    return response.data;
};

export const toggleUserStatus = async (id) => {
    const response = await api.patch(`/Users/${id}/status`);
    return response.data;
};