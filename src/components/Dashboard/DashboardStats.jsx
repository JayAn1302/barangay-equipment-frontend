import {
    Package2,
    Archive,
    ClipboardList,
    TriangleAlert,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

export default function DashboardStats({ dashboard }) {
    const stats = [
        {
            title: "TOTAL EQUIPMENT",
            value: dashboard.totalEquipment,
            subtitle: "Across all categories",
            icon: Package2,
            accent: "text-navy",
            bg: "bg-navy/10",
            trend: "+8",
            positive: true,
        },
        {
            title: "AVAILABLE",
            value: dashboard.availableEquipment,
            subtitle: "Ready to borrow",
            icon: Archive,
            accent: "text-ok",
            bg: "bg-ok/10",
            trend: "+12",
            positive: true,
        },
        {
            title: "ACTIVE BORROWINGS",
            value: dashboard.activeBorrowings,
            subtitle: "Currently borrowed",
            icon: ClipboardList,
            accent: "text-royal",
            bg: "bg-royal/10",
            trend: "+5",
            positive: true,
        },
        {
            title: "OVERDUE",
            value: dashboard.overdueBorrowings,
            subtitle: "Past return date",
            icon: TriangleAlert,
            accent: "text-bad",
            bg: "bg-bad/10",
            trend: "-3",
            positive: false,
        },
    ];

    return (
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">

            <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-2 md:divide-y-0 xl:grid-cols-4 xl:divide-x">

                {stats.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className="relative p-6 transition-all duration-300 hover:bg-ground"
                        >

                            {/* Trend */}

                            <div className="absolute right-5 top-5 flex items-center gap-1">

                                {item.positive ? (
                                    <TrendingUp
                                        size={14}
                                        className="text-ok"
                                    />
                                ) : (
                                    <TrendingDown
                                        size={14}
                                        className="text-bad"
                                    />
                                )}

                                <span
                                    className={`text-xs font-semibold ${
                                        item.positive
                                            ? "text-ok"
                                            : "text-bad"
                                    }`}
                                >
                                    {item.trend}
                                </span>

                            </div>

                            {/* Icon */}

                            <div
                                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${item.bg}`}
                            >
                                <Icon
                                    size={18}
                                    className={item.accent}
                                />
                            </div>

                            {/* Title */}

                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                                {item.title}
                            </p>

                            {/* Value */}

                            <h2 className="mt-2 text-4xl font-bold text-navy tnum">

                                {item.value}

                            </h2>

                            {/* Subtitle */}

                            <p className="mt-2 text-xs text-muted">

                                {item.subtitle}

                            </p>

                        </div>

                    );
                })}

            </div>

        </div>
    );
}