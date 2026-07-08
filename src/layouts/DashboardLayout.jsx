import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (

        <div className="flex h-screen bg-slate-100 overflow-hidden">

            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">

                <Navbar />

                <main className="flex-1 px-4 py-3 overflow-auto">

                    <Outlet />

                </main>

            </div>

        </div>

    );
}