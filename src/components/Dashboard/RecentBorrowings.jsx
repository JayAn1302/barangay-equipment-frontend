const statusStyle = {
    Borrowed: "text-[#1e3a8a] bg-[#1e3a8a]/10 ring-[#1e3a8a]/20",
    Returned: "text-[#6b6a63] bg-[#6b6a63]/10 ring-[#6b6a63]/20",
    Overdue: "text-[#b3341f] bg-[#b3341f]/10 ring-[#b3341f]/20",
};

export default function RecentBorrowings({ borrowings = [] }) {
    const fmt = (d) =>
        new Date(d).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });

    return (
        <div className="flex h-[670px] flex-col overflow-hidden rounded-2xl border border-line bg-surface">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <div className="flex items-baseline gap-3">
                    <span className="tnum text-xs font-semibold text-goldink">01</span>
                    <div>
                        <h2 className="font-serif text-base font-semibold tracking-tight">
                            Recent Borrowings
                        </h2>
                        <p className="mt-0.5 text-xs text-muted">
                            Latest equipment borrowing transactions
                        </p>
                    </div>
                </div>
                <button className="text-xs font-semibold text-royal transition hover:underline">
                    View all
                </button>
            </div>

            {/* Alert strip */}
            <div className="flex items-center gap-2 border-b border-warn/25 bg-warn/[0.07] px-6 py-2.5 text-sm">
                <span className="text-warn">⚠</span>
                <span className="text-muted">
                    Please follow up overdue borrowings immediately.
                </span>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-ground/80 backdrop-blur">
                        <tr className="text-left text-xs uppercase tracking-wider text-muted">
                            {["Ref ID", "Equipment", "Borrower", "Borrow Date", "Due Date", "Status"].map((h) => (
                                <th key={h} className="px-5 py-3 font-medium">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {borrowings.map((item, i) => (
                            <tr
                                key={item.id}
                                className={`border-t border-line transition hover:bg-royal/[0.03] ${
                                    i % 2 ? "bg-ground/40" : ""
                                }`}
                            >
                                <td className="tnum px-5 py-3.5 font-semibold text-goldink">
                                    {item.referenceNo}
                                </td>
                                <td className="px-5 py-3.5 font-medium">{item.equipmentName}</td>
                                <td className="px-5 py-3.5 text-muted">{item.borrowerName}</td>
                                <td className="tnum px-5 py-3.5 text-muted">{fmt(item.borrowDate)}</td>
                                <td className={`tnum px-5 py-3.5 ${item.status === "Overdue" ? "font-semibold text-bad" : "text-muted"}`}>
                                    {fmt(item.expectedReturnDate)}
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${statusStyle[item.status] || statusStyle.Returned}`}>
                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {borrowings.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-5 py-12 text-center text-sm text-muted">
                                    No recent borrowings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}