import {
    ClipboardList,
    PackageCheck,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

function Card({ title, value, icon, bg, color }) {
    return (
        <div className="rounded-2xl border border-line bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                        {title}
                    </p>

                    <h2 className="mt-2 text-4xl font-semibold text-navy">
                        {value}
                    </h2>

                </div>

                <div
                    className={`grid h-11 w-11 place-items-center rounded-xl ${bg}`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default function BorrowingStats({ borrowings }) {

    const total = borrowings.length;

    const active = borrowings.filter(
        (b) => b.status === "Borrowed"
    ).length;

    const overdue = borrowings.filter(
        (b) => b.status === "Overdue"
    ).length;

    const returned = borrowings.filter(
        (b) => b.status === "Returned"
    ).length;

    return (

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <Card
                title="Total Borrowings"
                value={total}
                bg="bg-slate-100"
                icon={
                    <ClipboardList
                        className="h-5 w-5 text-slate-700"
                    />
                }
            />

            <Card
                title="Active Borrowings"
                value={active}
                bg="bg-green-100"
                icon={
                    <PackageCheck
                        className="h-5 w-5 text-green-700"
                    />
                }
            />

            <Card
                title="Overdue"
                value={overdue}
                bg="bg-red-100"
                icon={
                    <AlertTriangle
                        className="h-5 w-5 text-red-700"
                    />
                }
            />

            <Card
                title="Returned"
                value={returned}
                bg="bg-yellow-100"
                icon={
                    <CheckCircle2
                        className="h-5 w-5 text-yellow-700"
                    />
                }
            />

        </div>

    );
}