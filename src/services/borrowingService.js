import api from "../api/axios";

export const getBorrowings = async () => {

    const response = await api.get("/Borrowings");

    return response.data;

};

export const createBorrowing = async (data) => {

    const response = await api.post("/Borrowings", data);

    return response.data;

};

export const updateBorrowing = async (id, data) => {

    const response = await api.put(`/Borrowings/${id}`, data);

    return response.data;

};

export const returnBorrowing = async (id, data) => {

    const response = await api.put(`/Borrowings/${id}/return`, data);

    return response.data;

};

export const deleteBorrowing = async (id) => {

    const response = await api.delete(`/Borrowings/${id}`);

    return response.data;

};