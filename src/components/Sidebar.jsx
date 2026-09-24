import {
    LayoutDashboard,
    Package,
    Users,
    ClipboardList,
    Undo2,
    Bell,
    BarChart3,
    FileClock,
    UserCog,
    Settings,
    LogOut,
    ChevronRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import Seal from "./Seal";

export default function Sidebar({ mobileOpen, onClose }) {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const fullName =
        localStorage.getItem("fullName") ||
        "System Administrator";

    const initials = fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const menu = [

        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
            no: "01",
        },

        {
            name: "Equipment",
            icon: Package,
            path: "/equipment",
            no: "02",
        },

        {
            name: "Borrowers",
            icon: Users,
            path: "/borrowers",
            no: "03",
        },

        {
            name: "Borrowings",
            icon: ClipboardList,
            path: "/borrowings",
            no: "04",
        },

        {
            name: "Returns",
            icon: Undo2,
            path: "/returns",
            no: "05",
        },

        {
            name: "Reports",
            icon: BarChart3,
            path: "/reports",
            no: "07",
        },

        {
            name: "Activity Logs",
            icon: FileClock,
            path: "/activity-logs",
            no: "08",
        },

        ...(role === "Admin"
            ? [
                  {
                      name: "Users",
                      icon: UserCog,
                      path: "/users",
                      no: "09",
                  },
              ]
            : []),
    ];

       return (

        <>

            {/* Mobile backdrop */}

            {mobileOpen && (

                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={onClose}
                />

            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[280px] flex-shrink-0 flex-col bg-[#0E1A36] text-white transition-transform duration-300 md:sticky md:top-0 md:translate-x-0 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >

            {/* ===============================
                    HEADER
            ================================ */}

            <div className="px-5 pt-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-[#B0892D]/30">

                        <Seal
                            size={36}
                            tone="gold"
                        />

                    </div>

                    <div>

                        <h1 className="font-serif text-[18px] font-semibold leading-none">
                            Barangay EBMS
                        </h1>

                        <p className="mt-1 text-[11px] tracking-wide text-[#C6A24D]">
                            Sta. Filomena • Dipolog City
                        </p>

                    </div>

                </div>

            </div>

            <div className="mx-5 mt-6 border-b border-white/10" />

            {/* ===============================
                    MENU
            ================================ */}

            <div className="flex-1 px-4 pt-3">

                <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">

                    Navigation

                </p>

                <div className="space-y-1">

                    {menu.map((item) => {

                        const Icon = item.icon;

                        return (

                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                        `group relative flex items-center rounded-xl px-3 py-2.5 transition-all duration-200 ${
                          isActive
                                ? "bg-white/10 text-white"
                               : "text-white/60 hover:bg-white/5 hover:text-white"
                                 }`
                                }
                            >

                                {({ isActive }) => (

                                    <>

                                        {/* Gold Indicator */}

                                        <span
                                            className={`absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-[#C6A24D] transition-all duration-300 ${
                                                isActive
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                        />

                                        {/* Icon */}

                                        <Icon
                                            size={18}
                                            className="mr-3"
                                        />

                                        {/* Title */}

                                        <span className="flex-1 text-sm font-medium">

                                            {item.name}

                                        </span>

                                        {/* Notification Badge */}

                                        {item.badge && (

                                            <span className="mr-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">

                                                {item.badge}

                                            </span>

                                        )}

                                        {/* Number */}


                                    </>

                                )}

                            </NavLink>

                        );

                    })}

                </div>

            </div>

                        {/* ===============================
                    PROFILE
            ================================ */}

            <div className="border-t border-white/10 p-4">

                <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">

                    <div className="flex items-center gap-3">

                        {/* Avatar */}

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C6A24D] text-sm font-bold text-[#0E1A36]">

                            {initials}

                        </div>

                        {/* User Info */}

                        <div className="min-w-0 flex-1">

                            <p className="truncate text-sm font-semibold text-white">

                                {fullName}

                            </p>

                            <p className="truncate text-xs text-white/50">

                                {role || "Staff"}

                            </p>

                        </div>

                    </div>

                </div>

                {/* Logout */}

                <button
                    onClick={handleLogout}
                    className="group flex w-full items-center justify-between rounded-xl border border-transparent px-3 py-3 text-sm text-white/60 transition-all duration-300 hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-400"
                >

                    <div className="flex items-center gap-3">

                        <LogOut size={18} />

                        <span className="font-medium">

                            Sign Out

                        </span>

                    </div>

                    <ChevronRight
                        size={16}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />

                </button>


            </div>

        </aside>

          </>


    );

}