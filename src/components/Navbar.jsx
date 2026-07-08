import {
    Bell,
    Moon,
    Sun,
    Search,
    Menu
} from "lucide-react";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {

    const fullName =
        localStorage.getItem("fullName") || "Administrator";

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    return (

        <header className="bg-white dark:bg-slate-900 h-20 shadow-sm border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-10 transition-colors duration-300">

            <div className="flex items-center gap-6">

                <Menu className="text-slate-600 cursor-pointer" />

                <div className="text-gray-500 dark:text-gray-300">

                    Home

                    <span className="mx-2">

                    </span>

                    <span className="text-blue-500 font-semibold">

                        Dashboard

                    </span>

                </div>

            </div>

            <div className="flex items-center gap-6">

                <div className="relative">

                    <Search
                        className="absolute left-4 top-3 text-gray-400 dark:text-gray-500"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search equipment..."
                        className="pl-11 w-72 h-11 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-black dark:text-white outline-none transition"
                    />

                </div>

                <Bell className="cursor-pointer text-gray-700 dark:text-gray-200" />

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition"
                >

                    {darkMode ? (
                        <Sun size={20} />
                    ) : (
                        <Moon size={20} />
                    )}

                </button>

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">

                        SA

                    </div>

                    <div>

                       <p className="font-semibold text-gray-900 dark:text-white">

                            {fullName}

                        </p>

                        <p className="text-gray-500 dark:text-gray-400 text-sm">

                            Administrator

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );
}