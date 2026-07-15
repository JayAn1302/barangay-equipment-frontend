import {
    Bell,
    Moon,
    Sun,
    Search,
    Menu
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SearchContext } from "../context/SearchContext";
import { searchAll } from "../services/searchService";
import { useRef } from "react";
import {
    getUnreadCount,
    getNotifications,
    markAsRead
} from "../services/notificationService";

export default function Navbar() {

    const fullName =
        localStorage.getItem("fullName") || "Administrator";

    const role = localStorage.getItem("role") || "Admin";

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const [unreadCount, setUnreadCount] = useState(0);

    const [notifications, setNotifications] = useState([]);

    const [showNotifications, setShowNotifications] = useState(false);

    const navigate = useNavigate();
    const searchRef = useRef(null);

    const location = useLocation();

   const {
    search,
    setSearch,
    results,
    setResults
} = useContext(SearchContext);

const pageName =
    location.pathname === "/dashboard"
        ? "Dashboard"
        : location.pathname === "/equipment"
        ? "Equipment"
        : location.pathname === "/borrowers"
        ? "Borrowers"
        : location.pathname === "/borrowings"
        ? "Borrowings"
        : location.pathname === "/reports"
        ? "Reports"
        : location.pathname === "/users"
        ? "Users"
        : "Dashboard";

    const loadUnreadCount = async () => {
        try {
            const count = await getUnreadCount();
            setUnreadCount(count);
        } catch (error) {
            console.error("Failed to load unread count:", error);
        }
    };

        useEffect(() => {

    loadUnreadCount();

    loadNotifications();

    const interval = setInterval(() => {

        loadUnreadCount();

        loadNotifications();

    }, 5000); // every 5 seconds

    return () => clearInterval(interval);

}, []);

    const loadNotifications = async () => {

    try {

        const data = await getNotifications();

        setNotifications(data);

    } catch (error) {

        console.error(error);

    }

};

const searchPlaceholder = {
    "/dashboard": "Search dashboard...",
    "/equipment": "Search equipment...",
    "/borrowers": "Search borrower...",
    "/borrowings": "Search borrowing...",
    "/reports": "Search reports...",
    "/users": "Search user..."
};

const handleNotificationClick = async (notification) => {

    try {

        // Mark notification as read
        await markAsRead(notification.notificationId);

        // Refresh unread badge
        await loadUnreadCount();

        // Close dropdown
        setShowNotifications(false);

        // Navigate based on notification type
        switch (notification.type) {

            case "Borrowing":
            navigate(`/borrowings?id=${notification.referenceId}`);
            break;

            case "Equipment":
                navigate("/equipment");
                break;

            case "Borrower":
                navigate("/borrowers");
                break;

            default:
                navigate("/dashboard");
                break;
        }

    } catch (error) {

        console.error(error);

    }

};

useEffect(() => {

    function handleClickOutside(event) {

        if (
            searchRef.current &&
            !searchRef.current.contains(event.target)
        ) {

            setResults([]);

        }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {

        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );

    };

}, []);

const handleSearch = async (value) => {

    setSearch(value);

    if (value.trim() === "") {

        setResults([]);

        return;
    }

    try {

        const data = await searchAll(value);

        setResults(data);

    } catch {

        setResults([]);

    }

};

        const handleSearchClick = (item) => {

    setResults([]);

    setSearch("");

    switch (item.type) {

        case "Equipment":

            navigate(`/equipment?id=${item.id}`);

            break;

        case "Borrower":

            navigate(`/borrowers?id=${item.id}`);

            break;

        case "Borrowing":

            navigate(`/borrowings?id=${item.id}`);

            break;

        default:

            break;

    }

};

    return (

        <header className="bg-white dark:bg-slate-900 h-20 shadow-sm border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-10 transition-colors duration-300">

            <div className="flex items-center gap-6">

                <Menu className="text-slate-600 cursor-pointer" />

                <div className="text-gray-500 dark:text-gray-300">

                    Home

                    <span className="mx-2">/</span>

                    <span className="text-blue-500 font-semibold">
                        {pageName}
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
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        type="text"
                        placeholder="Search equipment..."
                        className="pl-11 w-72 h-11 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-black dark:text-white outline-none"
                    />

                    

                    {results.length > 0 && (

                    <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden z-50">

                        {results.map((item) => (

                            <div
                                key={`${item.type}-${item.id}`}
                                onClick={() => handleSearchClick(item)}
                                className="px-4 py-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition flex items-center gap-3"
                            >

                                <div className="text-xl">

                                    {item.type === "Equipment" && "📦"}
                                    {item.type === "Borrower" && "👤"}
                                    {item.type === "Borrowing" && "📋"}

                                </div>

                                <div>

                                    <p className="font-semibold text-gray-800 dark:text-white">
                                        {item.title}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {item.subtitle}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

                </div>

                <div className="relative">

    <Bell
        onClick={() => setShowNotifications(!showNotifications)}
        className="cursor-pointer text-gray-700 dark:text-gray-200"
    />

    {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
            {unreadCount}
        </span>
    )}

    {showNotifications && (

<div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-[999] overflow-hidden">

    <div className="p-4 border-b font-semibold">

        Notifications

    </div>

    {notifications.length === 0 ? (

        <div className="p-6 text-center text-gray-500">

            No notifications

        </div>

    ) : (

        notifications.map((notification) => (

            <div
    key={notification.notificationId}
    onClick={() => handleNotificationClick(notification)}
    className={`px-4 py-3 border-b cursor-pointer transition ${
        notification.isRead
            ? "bg-white hover:bg-gray-50"
            : "bg-blue-50 hover:bg-blue-100"
    }`}
>

    <div className="flex justify-between items-start">

        <p
            className={`${
                notification.isRead
                    ? "font-medium text-gray-700"
                    : "font-bold text-black"
            }`}
        >
            {notification.title}
        </p>

        {!notification.isRead && (
            <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
        )}

        </div>

        <p
            className={`text-sm mt-1 ${
                notification.isRead
                    ? "text-gray-500"
                    : "text-gray-700"
            }`}
        >
            {notification.message}
        </p>

        <p className="text-xs text-gray-400 mt-2">
            {new Date(notification.createdAt).toLocaleString()}
        </p>

    </div>

            ))

        )}

    </div>

    )}

 </div>

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
                            {role === "Admin" ? "Administrator" : "Staff"}
                        </p>
                    </div>

                </div>

            </div>

        </header>

    );
}