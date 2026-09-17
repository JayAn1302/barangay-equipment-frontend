import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Equipment from "../pages/Equipment";
import Borrowers from "../pages/Borrowers";
import Borrowings from "../pages/Borrowings";
import Reports from "../pages/Reports";
import Users from "../pages/Users";
import NotFound from "../pages/NotFound";
import AdminRoute from "./AdminRoute";
import Returns from "../pages/Returns";
import ActivityLogs from "../pages/ActivityLogs";
import ForgotPassword from "../pages/ForgotPassword";
import { getToken } from "../utils/tokenStorage";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<RootRedirect />} />

            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Pages */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/borrowers" element={<Borrowers />} />
                <Route path="/borrowings" element={<Borrowings />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/activity-logs" element={<ActivityLogs />} />
                <Route
                    path="/users"
                    element={
                        <AdminRoute>
                            <Users />
                        </AdminRoute>
                    }
                />
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

function RootRedirect() {
    return getToken() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}