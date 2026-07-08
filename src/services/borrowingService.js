import api from "../api/axios";

export const getBorrowings = async () => {
    const response = await api.get("/Borrowings");
    return response.data;
};