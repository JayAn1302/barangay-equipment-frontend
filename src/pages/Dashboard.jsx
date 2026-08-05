import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

import WelcomeBanner from "../components/Dashboard/WelcomeBanner";
import DashboardStats from "../components/Dashboard/DashboardStats";
import AvailabilityChart from "../components/Dashboard/AvailabilityChart";
import MonthlyActivity from "../components/Dashboard/MonthlyActivity";
import RecentBorrowings from "../components/Dashboard/RecentBorrowings";

export default function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        const data = await getDashboard();
        setDashboard(data);
    }

    useEffect(() => {
        updateGreeting();

        const timer = setInterval(() => {
            setCurrentTime(new Date());
            updateGreeting();
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function updateGreeting() {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12)
            setGreeting("Good Morning");
        else if (hour >= 12 && hour < 17)
            setGreeting("Good Afternoon");
        else if (hour >= 17 && hour < 21)
            setGreeting("Good Evening");
        else
            setGreeting("Good Night");
    }

    if (!dashboard) return null;

    return (
        <div className="space-y-6 animate-fadeIn">

            {/* Welcome Banner */}
            <WelcomeBanner
                greeting={greeting}
                currentTime={currentTime}
                activeBorrowings={dashboard.activeBorrowings}
                overdueBorrowings={dashboard.overdueBorrowings}
            />

            {/* Dashboard Statistics */}
            <DashboardStats
                dashboard={dashboard}
            />

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                <div className="xl:col-span-5">
                    <AvailabilityChart
                        dashboard={dashboard}
                    />
                </div>

                <div className="xl:col-span-7">
                    <MonthlyActivity
                        data={dashboard.monthlyActivity}
                    />
                </div>

            </div>

            {/* Recent Borrowings */}
            <RecentBorrowings
                borrowings={dashboard.recentBorrowings}
            />

        </div>
    );
}