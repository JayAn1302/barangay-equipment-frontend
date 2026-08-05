import api from "../api/axios";

export async function getActivityLogs() {
    const response = await api.get("/ActivityLogs");
    return response.data;
}