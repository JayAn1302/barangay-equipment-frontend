import {
    FileText,
    Package,
    TriangleAlert,
} from "lucide-react";

export default function ReportTabs({

    activeTab,

    onChange,

}) {

    const tabs = [

        {
            id: "borrowings",
            label: "Borrowings",
            icon: FileText,
        },

        {
            id: "equipment",
            label: "Equipment",
            icon: Package,
        },

        {
            id: "overdue",
            label: "Overdue",
            icon: TriangleAlert,
        },

    ];

    return (

        <div className="fade-up flex flex-wrap gap-3">

            {tabs.map((tab) => {

                const Icon = tab.icon;

                const active = activeTab === tab.id;

                return (

                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all
                        ${
                            active
                                ? "border-navy bg-navy text-white shadow-sm"
                                : "border-line bg-surface text-ink hover:border-royal hover:bg-ground"
                        }`}
                    >

                        <Icon size={17} />

                        {tab.label}

                    </button>

                );

            })}

        </div>

    );

}