import api from "../api/axios";

// GET ALL
export const getBorrowers = async () => {
    const response = await api.get("/Borrowers");
    return response.data;
};

// CREATE
export const createBorrower = async (data) => {
    const response = await api.post("/Borrowers", data);
    return response.data;
};

// UPDATE
export const updateBorrower = async (id, data) => {
    const response = await api.put(`/Borrowers/${id}`, data);
    return response.data;
};

// DELETE
export const deleteBorrower = async (id) => {
    const response = await api.delete(`/Borrowers/${id}`);
    return response.data;
};