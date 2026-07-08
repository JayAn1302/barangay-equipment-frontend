import api from "../api/axios";

// GET ALL
export const getEquipments = async () => {
    const response = await api.get("/Equipment");
    return response.data;
};

// GET BY ID
export const getEquipment = async (id) => {
    const response = await api.get(`/Equipment/${id}`);
    return response.data;
};

// CREATE
export const createEquipment = async (data) => {
    const response = await api.post("/Equipment", data);
    return response.data;
};

// UPDATE
export const updateEquipment = async (id, data) => {
    const response = await api.put(`/Equipment/${id}`, data);
    return response.data;
};

// DELETE
export const deleteEquipment = async (id) => {
    const response = await api.delete(`/Equipment/${id}`);
    return response.data;
};