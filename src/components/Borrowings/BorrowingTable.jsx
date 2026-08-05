import { RotateCcw, Trash2, User, Package } from "lucide-react";

export default function BorrowingTable({
    borrowings,
    onReturn,
    onDelete,
}) {
    return (
        <div className="fade-up overflow-hidden rounded-2xl border border-line bg-surface">

            <table className="w-full">

                <thead className="bg-surface">

                    <tr className="border-b border-line text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">

                        <th className="px-6 py-4">Reference</th>
                        <th className="px-6 py-4">Borrower</th>
                        <th className="px-6 py-4">Equipment</th>
                        <th className="px-6 py-4">Borrow Date</th>
                        <th className="px-6 py-4">Expected Return</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-center">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {borrowings.length > 0 ? (

                        borrowings.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b border-line transition hover:bg-ground/60 last:border-0"
                            >

                                {/* Reference */}

                                <td className="px-6 py-4">

                                    <span className="rounded-full bg-ground px-3 py-1 text-xs font-semibold text-navy">

                                        {item.referenceNo}

                                    </span>

                                </td>

                                {/* Borrower */}

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ground">

                                            <User
                                                size={18}
                                                className="text-muted"
                                            />

                                        </div>

                                        <div>

                                            <p className="text-[15px] font-semibold text-navy">

                                                {item.borrowerName}

                                            </p>

                                            <p className="text-xs text-muted">

                                                Borrower

                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* Equipment */}

                                <td className="px-6 py-4">

                                    <div className="space-y-3">

                                        {item.items?.map((equipment, index) => (

                                            <div
                                                key={index}
                                                className="flex items-center gap-3"
                                            >

                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ground">

                                                    <Package
                                                        size={16}
                                                        className="text-muted"
                                                    />

                                                </div>

                                                <div>

                                                    <p className="text-sm font-semibold text-navy">

                                                        {equipment.equipmentName}

                                                    </p>

                                                    <p className="text-xs text-muted">

                                                        Borrowed: {equipment.quantityBorrowed}

                                                    </p>

                                                    <p className="text-xs text-green-600">

                                                        Returned: {equipment.quantityReturned}

                                                    </p>

                                                    <p className="text-xs font-medium text-orange-600">

                                                        Remaining: {equipment.quantityBorrowed - equipment.quantityReturned}

                                                    </p>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                </td>

                                {/* Borrow Date */}

                                <td className="px-6 py-4 text-sm text-muted">

                                    {new Date(item.borrowDate).toLocaleDateString(
                                        "en-PH",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}

                                </td>

                                {/* Expected Return */}

                                <td className="px-6 py-4 text-sm text-muted">

                                    {new Date(item.expectedReturnDate).toLocaleDateString(
                                        "en-PH",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}

                                </td>

                                {/* Status */}

                                <td className="px-6 py-4">

                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                                        ${
                                            item.status === "Borrowed"
                                                ? "bg-green-100 text-green-700"
                                                : item.status === "Partially Returned"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : item.status === "Returned"
                                                ? "bg-slate-100 text-slate-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                        >

                                        {item.status}

                                    </span>

                                </td>

                                {/* Actions */}

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-3">

                                        {(item.status === "Borrowed" ||
                                        item.status === "Overdue" ||
                                        item.status === "Partially Returned") && (

                                            <button
                                                onClick={() => onReturn(item)}
                                                className="text-slate-500 transition hover:text-navy"
                                                title="Return Equipment"
                                            >

                                                <RotateCcw size={17} />

                                            </button>

                                        )}

                                        {item.status === "Returned" && (

                                            <button
                                                onClick={() => onDelete(item.id)}
                                                className="text-slate-500 transition hover:text-red-600"
                                                title="Delete"
                                            >

                                                <Trash2 size={17} />

                                            </button>

                                        )}

                                    </div>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={7}
                                className="py-12 text-center text-muted"
                            >

                                No borrowings found.

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}