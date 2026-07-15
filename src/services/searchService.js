import api from "../api/axios";

export const searchAll = async (query) => {
    const response = await api.get(`/Search?query=${query}`);
    return response.data;
};