import { useState } from "react";
import { RotateCcw, Trash2, User, Package, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 5;

export default function BorrowingTable({
    borrowings,
    onReturn,
    onDelete,
}) {

    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(borrowings.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);

    const startIndex = (safePage - 1) * PAGE_SIZE;
    const paginatedBorrowings = borrowings.slice(startIndex, startIndex + PAGE_SIZE);

    const goToPage = (next) => {
        setPage(Math.min(Math.max(next, 1), totalPages));
    };

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

                                        {paginatedBorrowings.length > 0 ? (

                        paginatedBorrowings.map((item, rowIndex) => (

                            <tr
                                key={item.id}
                                className={`border-b border-line align-top transition hover:bg-ground/60 last:border-0 ${
                                    rowIndex % 2 === 1 ? "bg-ground/25" : "bg-surface"
                                }`}
                            >

                                {/* Reference */}

                                <td className="whitespace-nowrap px-6 py-4">

                                    <span className="whitespace-nowrap rounded-full bg-ground px-3 py-1 text-xs font-semibold text-navy">

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

                                       {item.items?.map((equipment, index) => {

    const remaining = equipment.quantityBorrowed - equipment.quantityReturned;
    const percentReturned = Math.round(
        (equipment.quantityReturned / equipment.quantityBorrowed) * 100
    );
    const fullyReturned = remaining === 0;

    return (

        <div
            key={index}
            className="flex items-start gap-3"
        >

            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-ground">

                <Package
                    size={16}
                    className="text-muted"
                />

            </div>

            <div className="min-w-[160px]">

                <p className="text-sm font-semibold text-navy">

                    {equipment.equipmentName}

                </p>

                <div className="mt-1.5 flex items-center gap-2">

                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ground">

                        <div
                            className={`h-full rounded-full transition-all ${
                                fullyReturned ? "bg-green-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${percentReturned}%` }}
                        />

                    </div>

                    <span
                        className={`text-xs font-medium ${
                            fullyReturned ? "text-green-600" : "text-amber-600"
                        }`}
                    >

                        {equipment.quantityReturned}/{equipment.quantityBorrowed} returned

                    </span>

                </div>

            </div>

        </div>

    );

})}

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

            {/* Pagination footer */}

            {borrowings.length > 0 && (

                <div className="flex items-center justify-between border-t border-line px-6 py-4">

                    <p className="text-xs text-muted">

                        Showing {startIndex + 1}
                        {"–"}
                        {Math.min(startIndex + PAGE_SIZE, borrowings.length)} of {borrowings.length}

                    </p>

                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => goToPage(safePage - 1)}
                            disabled={safePage === 1}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted transition hover:bg-ground disabled:cursor-not-allowed disabled:opacity-40"
                        >

                            <ChevronLeft size={16} />

                        </button>

                        <span className="text-xs font-medium text-navy">

                            {safePage} of {totalPages}

                        </span>

                        <button
                            onClick={() => goToPage(safePage + 1)}
                            disabled={safePage === totalPages}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted transition hover:bg-ground disabled:cursor-not-allowed disabled:opacity-40"
                        >

                            <ChevronRight size={16} />

                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}