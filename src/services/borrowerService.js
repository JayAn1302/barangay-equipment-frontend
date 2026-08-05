import api from "../api/axios";

// GET ALL
export const getBorrowers = async () => {
    const response = await api.get("/Borrowers");
    return response.data;
};

// CREATE
export const createBorrower = async (data) => {

    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("address", data.address);
    formData.append("contactNumber", data.contactNumber);

    if (data.photo) {
        formData.append("photo", data.photo);
    }

    const response = await api.post("/Borrowers", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

// UPDATE
export const updateBorrower = async (id, data) => {

    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("address", data.address);
    formData.append("contactNumber", data.contactNumber);

    if (data.photo) {
        formData.append("photo", data.photo);
    }

    const response = await api.put(`/Borrowers/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

// DELETE
export const deleteBorrower = async (id) => {
    const response = await api.delete(`/Borrowers/${id}`);
    return response.data;
};