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

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="/login" element={<Login />} />

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