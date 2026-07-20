import axios from "axios";

const API_URL = "https://barangayequipment2.runasp.net/api/Notification";
// Replace 7143 with your backend port if it's different.

export const getNotifications = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getUnreadCount = async () => {
    const response = await axios.get(`${API_URL}/unread-count`);
    return response.data;
};

export const markAsRead = async (id) => {
    await axios.put(`${API_URL}/${id}/read`);
};