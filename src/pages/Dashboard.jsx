import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

import WelcomeBanner from "../components/Dashboard/WelcomeBanner";
import StatsCard from "../components/Dashboard/StatsCard";
import RecentBorrowings from "../components/Dashboard/RecentBorrowings";
import AvailabilityChart from "../components/Dashboard/AvailabilityChart";
import QuickActions from "../components/Dashboard/QuickActions";
import {

    Package2,
    Users2,
    ClipboardList,
    TriangleAlert

} from "lucide-react";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [greeting, setGreeting] = useState("");
    const updateGreeting = () => {

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        setGreeting("🌅 Good Morning");
    }
    else if (hour >= 12 && hour < 17) {
        setGreeting("☀️ Good Afternoon");
    }
    else if (hour >= 17 && hour < 21) {
        setGreeting("🌇 Good Evening");
    }
    else {
        setGreeting("🌙 Good Night");
    }

};

    async function loadDashboard() {

    console.log("loadDashboard called");

    try {
        const data = await getDashboard();

        console.log("Dashboard data:", data);

        setDashboard(data);
    }
    catch (err) {
        console.error("Dashboard error:", err);
    }
}

    useEffect(() => {

    updateGreeting();

    const timer = setInterval(() => {

        setCurrentTime(new Date());

        updateGreeting();

    },1000);

    return ()=>clearInterval(timer);

},[]);

    if (!dashboard) return null;

    return (

        <div className="space-y-5">

            <WelcomeBanner
    greeting={greeting}
    currentTime={currentTime}
    overdueBorrowings={dashboard.overdueBorrowings}
/>

           <div className="grid grid-cols-4 gap-5">

                <StatsCard
                    title="Total Equipment"
                    value={dashboard.totalEquipment}
                    subtitle="↑ Available"
                    icon={<Package2 className="text-blue-600" size={24} />}
                    color="bg-blue-100"
                />

                <StatsCard
                    title="Total Borrowers"
                    value={dashboard.totalBorrowers}
                    subtitle="↑ Registered"
                    icon={<Users2 className="text-purple-600" size={24} />}
                    color="bg-purple-100"
                />

                <StatsCard
                    title="Active Borrowings"
                    value={dashboard.activeBorrowings}
                    subtitle="Currently Active"
                    icon={<ClipboardList className="text-green-600" size={24} />}
                    color="bg-green-100"
                />

                <StatsCard
                    title="Overdue Borrowings"
                    value={dashboard.overdueBorrowings}
                    subtitle="Needs attention"
                    icon={<TriangleAlert className="text-red-600" size={24} />}
                    color="bg-red-100"
                />

            </div>

            

           <div className="grid grid-cols-12 gap-6 items-stretch">

    {/* LEFT */}
    <div className="col-span-8">
        <RecentBorrowings
            borrowings={dashboard.recentBorrowings}
        />
    </div>

    {/* RIGHT */}
    <div className="col-span-4 grid grid-rows-[1fr_1fr] gap-3">

        <AvailabilityChart dashboard={dashboard} />

        <QuickActions />

    </div>

</div>

        </div>

    );

}