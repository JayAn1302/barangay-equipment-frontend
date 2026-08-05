export default function ReportTable({ activeTab, reports }) {

    if (reports.length === 0) {

        return (

            <div className="fade-up rounded-2xl border border-line bg-surface p-12 text-center">

                <h3 className="text-lg font-semibold text-ink">
                    No records found
                </h3>

                <p className="mt-2 text-sm text-muted">
                    There are no available reports to display.
                </p>

            </div>

        );

    }

    return (

        <div className="fade-up overflow-hidden rounded-2xl border border-line bg-surface">

            <table className="w-full border-collapse">

                <thead className="bg-ground">

                    <tr>

                        {activeTab === "borrowings" && (
                            <>
                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Reference
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Borrower
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Equipment
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Quantity
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Borrow Date
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Expected Return
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Status
                                </th>
                            </>
                        )}

                        {activeTab === "equipment" && (
                            <>
                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Equipment
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Category
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Total
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Available
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Borrowed
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Status
                                </th>
                            </>
                        )}

                        {activeTab === "overdue" && (
                            <>
                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Reference
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Borrower
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Equipment
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Quantity
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Due Date
                                </th>

                                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                                    Days Overdue
                                </th>
                            </>
                        )}

                    </tr>

                </thead>

                <tbody>

                    {reports.map((item, index) => (

                        <tr
                            key={index}
                            className="border-t border-line transition hover:bg-ground/60"
                        >

                            {activeTab === "borrowings" && (
                                <>
                                    <td className="px-5 py-4 font-semibold text-navy">
                                        {item.referenceNo}
                                    </td>

                                    <td className="px-5 py-4 text-sm">
                                        {item.borrower}
                                    </td>

                                    <td className="px-5 py-4 text-sm">
                                        {item.equipment}
                                    </td>

                                    <td className="px-5 py-4 text-sm">
                                        {item.quantity}
                                    </td>

                                    <td className="px-5 py-4 text-sm">
                                        {item.borrowDate}
                                    </td>

                                    <td className="px-5 py-4 text-sm">
                                        {item.expectedReturnDate}
                                    </td>

                                    <td className="px-5 py-4">

                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                                            ${
                                                item.status === "Borrowed"
                                                    ? "bg-green-100 text-green-700"
                                                    : item.status === "Returned"
                                                    ? "bg-slate-100 text-slate-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>
                                </>
                            )}

                            {activeTab === "equipment" && (
                                <>
                                    <td className="px-5 py-4 font-medium">
                                        {item.equipment}
                                    </td>

                                    <td className="px-5 py-4">
                                        {item.category}
                                    </td>

                                    <td className="px-5 py-4">
                                        {item.totalQuantity}
                                    </td>

                                    <td className="px-5 py-4">
                                        {item.availableQuantity}
                                    </td>

                                    <td className="px-5 py-4">
                                        {item.borrowedQuantity}
                                    </td>

                                    <td className="px-5 py-4">

                                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {item.status}
                                        </span>

                                    </td>
                                </>
                            )}

                            {activeTab === "overdue" && (
                                <>
                                    <td className="px-5 py-4 font-semibold text-navy">
                                        {item.referenceNo}
                                    </td>

                                    <td className="px-5 py-4">
                                        {item.borrower}
                                    </td>

                                    <td className="px-5 py-4">
                                        {item.equipment}
                                    </td>

                                    <td className="px-5 py-4">
                                        {item.quantity}
                                    </td>

                                    <td className="px-5 py-4">
                                        {item.dueDate}
                                    </td>

                                    <td className="px-5 py-4">

                                        <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                            {item.daysOverdue} day(s)
                                        </span>

                                    </td>
                                </>
                            )}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}