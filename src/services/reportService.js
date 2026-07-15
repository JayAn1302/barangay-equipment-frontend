import api from "../api/axios";

export const getBorrowingReport = async () => {
    const response = await api.get("/Reports/borrowings");
    return response.data;
};

export const getEquipmentReport = async () => {
    const response = await api.get("/Reports/equipment");
    return response.data;
};

export const getOverdueReport = async () => {
    const response = await api.get("/Reports/overdue");
    return response.data;
};