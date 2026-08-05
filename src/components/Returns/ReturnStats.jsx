import {
    RotateCcw,
    PackageCheck,
    CalendarDays,
    CheckCircle2,
} from "lucide-react";

function Card({ title, value, icon, bg }) {
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

                <div className={`grid h-11 w-11 place-items-center rounded-xl ${bg}`}>
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default function ReturnStats({ returns }) {

    const totalReturns = returns.length;

    const totalItems = returns.reduce((total, borrowing) => {

        const qty =
            borrowing.items?.reduce(
                (sum, item) => sum + item.quantityBorrowed,
                0
            ) || 0;

        return total + qty;

    }, 0);

    const today = new Date().toDateString();

    const todayReturns = returns.filter((item) => {

        if (!item.actualReturnDate) return false;

        return (
            new Date(item.actualReturnDate).toDateString() === today
        );

    }).length;

    const completed = returns.filter(
        (item) => item.status === "Returned"
    ).length;

    return (

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <Card
                title="Total Returns"
                value={totalReturns}
                bg="bg-slate-100"
                icon={
                    <RotateCcw className="h-5 w-5 text-slate-700" />
                }
            />

            <Card
                title="Items Returned"
                value={totalItems}
                bg="bg-green-100"
                icon={
                    <PackageCheck className="h-5 w-5 text-green-700" />
                }
            />

            <Card
                title="Today's Returns"
                value={todayReturns}
                bg="bg-yellow-100"
                icon={
                    <CalendarDays className="h-5 w-5 text-yellow-700" />
                }
            />

            <Card
                title="Completed"
                value={completed}
                bg="bg-yellow-100"
                icon={
                    <CheckCircle2 className="h-5 w-5 text-yellow-700" />
                }
            />

        </div>

    );
}