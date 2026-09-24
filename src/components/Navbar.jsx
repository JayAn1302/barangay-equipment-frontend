import {
    Bell,
    Moon,
    Sun,
    Search,
    ChevronDown,
    Menu,
} from "lucide-react";

import {
    useNavigate,
    useLocation,
} from "react-router-dom";

import {
    useContext,
    useEffect,
    useState,
    useRef,
} from "react";

import { ThemeContext } from "../context/ThemeContext";
import { SearchContext } from "../context/SearchContext";

import { searchAll } from "../services/searchService";

import {
    getUnreadCount,
    getNotifications,
    markAsRead,
} from "../services/notificationService";

export default function Navbar({ onOpenSidebar }) {

    const navigate = useNavigate();
    const location = useLocation();

    const { darkMode, setDarkMode } =
        useContext(ThemeContext);

    const {
        search,
        setSearch,
        results,
        setResults,
    } = useContext(SearchContext);

    const searchRef = useRef(null);

    const fullName =
        localStorage.getItem("fullName") ||
        "Administrator";

    const role =
        localStorage.getItem("role") ||
        "Admin";

    const initials = fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("");

    const [notifications, setNotifications] =
        useState([]);

    const [unreadCount, setUnreadCount] =
        useState(0);

    const [showNotifications, setShowNotifications] =
        useState(false);

    // Greeting

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
            ? "Good Afternoon"
            : "Good Evening";

    // Page Title

    const pageName =
        location.pathname === "/dashboard"
            ? "Dashboard"
            : location.pathname === "/equipment"
            ? "Equipment"
            : location.pathname === "/borrowers"
            ? "Borrowers"
            : location.pathname === "/borrowings"
            ? "Borrowings"
            : location.pathname === "/returns"
            ? "Returns"
            : location.pathname === "/notifications"
            ? "Notifications"
            : location.pathname === "/reports"
            ? "Reports"
            : location.pathname === "/activity-logs"
            ? "Activity Logs"
            : location.pathname === "/settings"
            ? "Settings"
            : location.pathname === "/users"
            ? "Users"
            : "Dashboard";

    const isDashboard = location.pathname === "/dashboard";

    const searchPlaceholder = {

        "/dashboard":
            "Search anything...",

        "/equipment":
            "Search equipment...",

        "/borrowers":
            "Search borrowers...",

        "/borrowings":
            "Search borrowings...",

        "/returns":
            "Search returned equipment...",

        "/notifications":
            "Search notifications...",

        "/reports":
            "Search reports...",

        "/activity-logs":
            "Search activity logs...",

        "/settings":
            "Search settings...",

        "/users":
            "Search users...",
    };

    // Notification Loader

    const loadUnreadCount = async () => {

        try {

            const count =
                await getUnreadCount();

            setUnreadCount(count);

        } catch (err) {

            console.error(err);

        }

    };

    const loadNotifications = async () => {

        try {

            const data =
                await getNotifications();

            setNotifications(data);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        loadUnreadCount();

        loadNotifications();

        const interval = setInterval(() => {

            loadUnreadCount();

            loadNotifications();

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    // Search

    const handleSearch = async (value) => {

        setSearch(value);

        if (value.trim() === "") {

            setResults([]);

            return;

        }

        try {

            const data =
                await searchAll(value);

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

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {

                setResults([]);

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    useEffect(() => {

        const escape = (e) => {

            if (e.key === "Escape") {

                setResults([]);

            }

        };

        window.addEventListener(
            "keydown",
            escape
        );

        return () =>
            window.removeEventListener(
                "keydown",
                escape
            );

    }, []);

    // Notification Click

    const handleNotificationClick = async (
        notification
    ) => {

        await markAsRead(
            notification.notificationId
        );

        await loadUnreadCount();

        setShowNotifications(false);

        switch (notification.type) {

            case "Borrowing":

                navigate(
                    `/borrowings?id=${notification.referenceId}`
                );

                break;

            case "Equipment":

                navigate("/equipment");

                break;

            case "Borrower":

                navigate("/borrowers");

                break;

            default:

                navigate("/dashboard");

        }

    };

    return (

<header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-line bg-surface/90 px-4 backdrop-blur-md md:px-8">

    {/* =========================
            LEFT SIDE
    ========================== */}

   <div className="flex items-center gap-3">

   <button
       onClick={onOpenSidebar}
       className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ground transition hover:bg-surface md:hidden"
   >
       <Menu size={19} />
   </button>

   <p className="text-sm">
    <span className="text-muted">EBMS</span>
    <span className="mx-2 text-muted/50">/</span>
    <span className="font-semibold text-navy">{pageName}</span>
</p>

</div>

    {/* =========================
            RIGHT SIDE
    ========================== */}

    <div className="flex items-center gap-4">

        {/* Search */}
        {isDashboard && (
        <div
            className="relative"
            ref={searchRef}
        >

            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <input

                type="text"

                value={search}

                onChange={(e) =>
                    handleSearch(e.target.value)
                }

                placeholder={
                    searchPlaceholder[
                        location.pathname
                    ] || "Search..."
                }

                               className="
                    w-[200px]
                    sm:w-[280px]
                    md:w-[380px]
                    rounded-2xl
                    border
                    border-line
                    bg-ground
                    py-3
                    pl-11
                    pr-4
                    text-sm
                    outline-none
                    transition-all
                    focus:border-royal
                    focus:ring-4
                    focus:ring-royal/10
                "

            />

            {/* Search Results */}

            {search.trim() !== "" && (

                <div className="absolute left-0 top-16 z-50 w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">

                    {results.length === 0 ? (

                        <div className="px-8 py-10 text-center">

                            <Search
                                size={28}
                                className="mx-auto mb-3 text-muted/40"
                            />

                            <p className="font-semibold">

                                No Results Found

                            </p>

                            <p className="mt-1 text-xs text-muted">

                                Try another keyword.

                            </p>

                        </div>

                    ) : (

                        results.map((item) => (

                            <div

                                key={`${item.type}-${item.id}`}

                                onClick={() =>
                                    handleSearchClick(item)
                                }

                                className="flex cursor-pointer items-center gap-4 border-l-4 border-transparent px-5 py-4 transition hover:border-gold hover:bg-ground"

                            >

                                <span className="rounded-full bg-gold/10 px-2 py-1 text-[10px] font-bold uppercase text-gold">

                                    {item.type}

                                </span>

                                <div className="min-w-0 flex-1">

                                    <p className="truncate font-medium">

                                        {item.title}

                                    </p>

                                    <p className="truncate text-xs text-muted">

                                        {item.subtitle}

                                    </p>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            )}

        </div>

        )}

        {/* Notification */}

        <div className="relative">

            <button

                onClick={() =>
                    setShowNotifications(
                        !showNotifications
                    )
                }

                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ground transition hover:scale-105 hover:bg-surface"

            >

                <Bell size={19} />

                {unreadCount > 0 && (

                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">

                        {unreadCount}

                    </span>

                )}

            </button>

                            {showNotifications && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowNotifications(false)}
                        />

                        <div className="absolute right-0 top-14 z-20 w-[380px] overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">

                            {/* Header */}

                            <div className="flex items-center justify-between border-b border-line px-5 py-4">

                                <div>

                                    <h3 className="font-semibold">

                                        Notifications

                                    </h3>

                                    <p className="text-xs text-muted">

                                        {unreadCount} unread notifications

                                    </p>

                                </div>

                            </div>

                            {/* Notification List */}

                            <div className="max-h-[420px] overflow-y-auto">

                                {notifications.length === 0 ? (

                                    <div className="px-8 py-10 text-center">

                                        <Bell
                                            size={30}
                                            className="mx-auto mb-3 text-muted/40"
                                        />

                                        <p className="font-medium">

                                            No Notifications

                                        </p>

                                    </div>

                                ) : (

                                    notifications.map((notification) => (

                                        <div
                                            key={notification.notificationId}
                                            onClick={() =>
                                                handleNotificationClick(notification)
                                            }
                                            className={`cursor-pointer border-l-4 px-5 py-4 transition hover:bg-ground ${
                                                notification.isRead
                                                    ? "border-transparent"
                                                    : "border-l-4 border-blue-600 bg-blue-50"
                                            }`}
                                        >

                                            <div className="flex items-start justify-between gap-3">

                                                <div className="min-w-0">

                                                    <p
                                                        className={`truncate ${
                                                            notification.isRead
                                                                ? "font-medium"
                                                                : "font-semibold"
                                                        }`}
                                                    >
                                                        {notification.title}
                                                    </p>

                                                    <p className="mt-1 text-xs leading-relaxed text-muted">

                                                        {notification.message}

                                                    </p>

                                                    <p className="mt-2 text-[11px] text-muted">

                                                        {new Date(
                                                            notification.createdAt
                                                        ).toLocaleString()}

                                                    </p>

                                                </div>

                                                {!notification.isRead && (
                                                    <span className="mt-2 h-2 w-2 rounded-full bg-red-500" />
                                                )}

                                            </div>

                                        </div>

                                    ))

                                )}

                            </div>

                        </div>

                    </>
                )}

        </div>

        {/* Theme */}

        <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ground transition hover:scale-105 hover:bg-surface"
        >

            {darkMode ? (
                <Sun size={19} />
            ) : (
                <Moon size={19} />
            )}

        </button>

        {/* Divider */}

        <div className="h-8 w-px bg-line" />

        {/* Profile */}

        <button className="flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-ground">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-semibold text-white">

                {initials}

            </div>

            <div className="hidden text-left lg:block">

                <p className="text-sm font-semibold">

                    {fullName}

                </p>

                <p className="text-xs text-muted">

                    {role === "Admin"
                        ? "Administrator"
                        : "Staff"}

                </p>

            </div>

            <ChevronDown
                size={18}
                className="text-muted"
            />

        </button>

    </div>

</header>

    );

}