import {
    LayoutDashboard,
    Package,
    Users,
    ClipboardList,
    BarChart3,
    UserCog,
    LogOut,
    Shield
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const menu = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard"
        },
        {
            name: "Equipment",
            icon: Package,
            path: "/equipment"
        },
        {
            name: "Borrowers",
            icon: Users,
            path: "/borrowers"
        },
        {
            name: "Borrowings",
            icon: ClipboardList,
            path: "/borrowings"
        },
        {
            name: "Reports",
            icon: BarChart3,
            path: "/reports"
        },
        {
            name: "Users",
            icon: UserCog,
            path: "/users"
        }
    ];

    return (
        <aside className="w-[230px] h-screen bg-[#08284A] text-white flex flex-col flex-shrink-0">

            {/* Logo */}

            <div className="px-6 py-5 border-b border-blue-900">

                <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center">

                        <Shield size={24} className="text-[#08284A]" />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold leading-none">
                            Barangay
                        </h1>

                        <p className="text-gray-300 text-sm mt-1">
                            Equipment System
                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <div className="px-5 mt-6">

                <p className="text-blue-300 text-xs font-semibold tracking-widest mb-4">

                    NAVIGATION

                </p>

                <div className="space-y-1.5">

                    {
                        menu.map((item) => {

                            const Icon = item.icon;

                            return (

                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>

                                        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                                        
                                        ${isActive
                                            ? "bg-blue-600 shadow-lg"
                                            : "hover:bg-blue-700"
                                        }`
                                    }
                                >

                                    <Icon size={20} />

                                    <span className="text-[15px] font-medium">

                                        {item.name}

                                    </span>

                                </NavLink>

                            );

                        })
                    }

                </div>

            </div>

            <div className="mt-auto px-5 py-5 border-t border-blue-900">

                <button className="flex items-center gap-3 text-red-400 hover:text-red-300 transition">

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>
    );
}