import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-ground transition-colors duration-300">

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Navbar />

                <main className="flex-1 overflow-auto bg-ground px-6 py-5 transition-colors duration-300">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}