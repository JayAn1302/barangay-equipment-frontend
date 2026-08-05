import {
    FileText,
    Package,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

export default function ReportStats({ reports, activeTab }) {

    const total = reports.length;

    const borrowed =
        reports.filter(r => r.status === "Borrowed").length;

    const returned =
        reports.filter(r => r.status === "Returned").length;

    const overdue =
        activeTab === "overdue"
            ? reports.length
            : reports.filter(r => r.status === "Overdue").length;

    const cards = [

        {
            title: "Total Reports",
            value: total,
            icon: FileText,
            color: "bg-blue-100 text-blue-700",
        },

        {
            title: "Borrowed",
            value: borrowed,
            icon: Package,
            color: "bg-green-100 text-green-700",
        },

        {
            title: "Returned",
            value: returned,
            icon: CheckCircle2,
            color: "bg-yellow-100 text-yellow-700",
        },

        {
            title: "Overdue",
            value: overdue,
            icon: AlertTriangle,
            color: "bg-red-100 text-red-700",
        },

    ];

    return (

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="fade-up rounded-2xl border border-line bg-surface p-5 shadow-sm"
                    >

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">

                                    {card.title}

                                </p>

                                <h2 className="mt-3 text-4xl font-semibold text-navy">

                                    {card.value}

                                </h2>

                            </div>

                            <div
                                className={`grid h-11 w-11 place-items-center rounded-xl ${card.color}`}
                            >

                                <Icon size={20} />

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}