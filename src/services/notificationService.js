import api from "../api/axios";

export async function getNotifications() {

    const response = await api.get("/Notification");

    return response.data;

}

export async function markAsRead(id) {

    await api.put(`/Notification/${id}/read`);

}

export async function getUnreadCount() {

    const response = await api.get("/Notification/unread-count");

    return response.data;

}