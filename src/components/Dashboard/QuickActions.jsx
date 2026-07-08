import {
    Package,
    Users,
    ClipboardList,
    BarChart3,
    UserCog,
    Settings
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            title: "Add Equipment",
            icon: Package,
            color: "bg-blue-50",
            iconColor: "text-blue-600",
            path: "/equipment"
        },

        {
            title: "Add Borrower",
            icon: Users,
            color: "bg-green-50",
            iconColor: "text-green-600",
            path: "/borrowers"
        },

        {
            title: "New Borrowing",
            icon: ClipboardList,
            color: "bg-purple-50",
            iconColor: "text-purple-600",
            path: "/borrowings"
        },

        {
            title: "View Reports",
            icon: BarChart3,
            color: "bg-yellow-50",
            iconColor: "text-yellow-600",
            path: "/reports"
        },

        {
            title: "Manage Users",
            icon: UserCog,
            color: "bg-cyan-50",
            iconColor: "text-cyan-600",
            path: "/users"
        },

        {
            title: "Settings",
            icon: Settings,
            color: "bg-gray-100",
            iconColor: "text-gray-600",
            path: "/dashboard"
        }

    ];

    return (

        <div className="bg-white rounded-3xl shadow h-[330px] p-5 flex flex-col">

            <h2 className="text-xl font-bold text-slate-800 mb-4">

                Quick Actions

            </h2>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {actions.map((item) => {

                    const Icon = item.icon;

                    return (

                        <button
                            key={item.title}
                            onClick={() => navigate(item.path)}
                            className={`${item.color}
                                h-[74px]
                                rounded-xl
                                px-3
                                py-2
                                hover:scale-[1.02]
                                hover:shadow-lg
                                transition
                                duration-300`}
                        >

                            <Icon
                                size={24}
                                className={`${item.iconColor} mx-auto`}
                            />

                            <p className="mt-2 text-sm text-xs font-medium text-slate-700 text-center leading-tight">

                                {item.title}

                            </p>

                        </button>

                    );

                })}

            </div>

        </div>

    );

}