import { PackageCheck } from "lucide-react";

export default function AvailabilityChart({ dashboard }) {
    if (!dashboard) return null;

    const total = dashboard.totalEquipment || 1;

    const items = [
        {
            title: "Available",
            value: dashboard.availableEquipment,
            color: "bg-ok",
        },
        {
            title: "Borrowed",
            value: dashboard.borrowedEquipment,
            color: "bg-royal",
        },
        {
            // Change this to dashboard.returnedEquipment later
            title: "Returned",
            value: dashboard.maintenanceEquipment,
            color: "bg-gold",
        },
    ];

    return (
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">

            {/* Header */}
            <div className="mb-8 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10">

                    <PackageCheck
                        size={20}
                        className="text-navy"
                    />

                </div>

                <div>

                    <h2 className="font-serif text-lg font-semibold text-navy">
                        Equipment Availability
                    </h2>

                    <p className="text-sm text-muted">
                        Current equipment status
                    </p>

                </div>

            </div>

            {/* Progress Bars */}

            <div className="space-y-6">

                {items.map((item) => {

                    const percentage =
                        Math.min((item.value / total) * 100, 100);

                    return (

                        <div key={item.title}>

                            <div className="mb-2 flex items-center justify-between">

                                <span className="text-sm font-medium text-muted">
                                    {item.title}
                                </span>

                                <span className="tnum text-sm font-semibold text-navy">
                                    {item.value}
                                </span>

                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-ground">

                                <div
                                    className={`${item.color} h-full rounded-full transition-all duration-700`}
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* Footer */}

            <div className="mt-8 border-t border-line pt-5">

                <div className="flex items-center justify-between">

                    <span className="text-sm text-muted">
                        Total Equipment
                    </span>

                    <span className="tnum text-3xl font-bold text-navy">
                        {dashboard.totalEquipment}
                    </span>

                </div>

            </div>

        </div>
    );
}