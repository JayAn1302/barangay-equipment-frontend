import { RotateCcw } from "lucide-react";

export default function ReturnTable({ returns }) {
    return (
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">

            <table className="w-full">

                <thead className="border-b border-line bg-surface">

                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted">

                        <th className="px-7 py-5">Reference</th>

                        <th className="px-7 py-5">Borrower</th>

                        <th className="px-7 py-5">Equipment Returned</th>

                        <th className="px-7 py-5">Borrow Date</th>

                        <th className="px-7 py-5">Return Date</th>

                        <th className="px-7 py-5">Remarks</th>

                        <th className="px-7 py-5">Status</th>

                    </tr>

                </thead>

                <tbody>

                    {returns.length > 0 ? (

                        returns.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b border-line last:border-0 hover:bg-ground transition"
                            >

                                {/* Reference */}

                                <td className="px-7 py-5">

                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                                        RTN-{String(item.id).padStart(4, "0")}

                                    </span>

                                </td>

                                {/* Borrower */}

                                <td className="px-7 py-5">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 font-semibold text-navy">

                                            {item.borrowerName?.charAt(0)}

                                        </div>

                                        <div>

                                            <p className="font-semibold text-navy">

                                                {item.borrowerName}

                                            </p>

                                            <p className="text-sm text-muted">

                                                Returned Equipment

                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* Equipment */}

                                <td className="px-7 py-5">

                                    <div className="space-y-3">

                                        {item.items?.map((equipment, index) => (

                                            <div
                                                key={index}
                                                className="flex items-center gap-3"
                                            >

                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100">

                                                    📦

                                                </div>

                                                <div>

                                                    <p className="font-semibold text-navy">

                                                        {equipment.equipmentName}

                                                    </p>

                                                    <p className="text-sm text-muted">

                                                        Qty {equipment.quantityBorrowed}

                                                    </p>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                </td>

                                {/* Borrow Date */}

                                <td className="px-7 py-5 text-sm">

                                    {new Date(item.borrowDate).toLocaleDateString(
                                        "en-PH",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}

                                </td>

                                {/* Return Date */}

                                <td className="px-7 py-5 text-sm">

                                    {item.actualReturnDate
                                        ? new Date(
                                              item.actualReturnDate
                                          ).toLocaleDateString("en-PH", {
                                              month: "short",
                                              day: "numeric",
                                              year: "numeric",
                                          })
                                        : "-"}

                                </td>

                                {/* Remarks */}

                                <td className="px-7 py-5">

                                    <span className="text-sm text-muted">

                                        {item.remarks || "-"}

                                    </span>

                                </td>

                                {/* Status */}

                                <td className="px-7 py-5">

                                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                                        <RotateCcw size={13} />

                                        Returned

                                    </span>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={7}
                                className="py-14 text-center text-muted"
                            >

                                No returned equipment found.

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}