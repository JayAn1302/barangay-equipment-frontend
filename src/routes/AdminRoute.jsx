import { Navigate } from "react-router-dom";
import { getRole } from "../utils/tokenStorage";

export default function AdminRoute({ children }) {
    const role = getRole();

    if (role !== "Admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}