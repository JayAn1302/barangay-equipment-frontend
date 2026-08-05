import { Pencil, Trash2, User } from "lucide-react";

export default function BorrowerTable({
    borrowers,
    onEdit,
    onDelete,
}) {
    return (
        <div className="fade-up overflow-hidden rounded-2xl border border-line bg-surface">

            <table className="w-full">

                <thead className="bg-surface">

                    <tr className="border-b border-line text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">

                        <th className="px-6 py-4">
                            Borrower
                        </th>

                        <th className="px-6 py-4">
                            Address
                        </th>

                        <th className="px-6 py-4">
                            Contact Number
                        </th>

                        <th className="px-6 py-4">
                            Status
                        </th>

                        <th className="px-6 py-4 text-center">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {borrowers.length > 0 ? (

                        borrowers.map((item) => (

                            <tr
                                key={item.id}
                                className="border-b border-line transition hover:bg-ground/60 last:border-0"
                            >

                                {/* Borrower */}

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        {item.photoPath ? (

                                            <img
                                                src={`https://barangayequipment2.runasp.net/${item.photoPath}`}
                                                alt={item.fullName}
                                                className="h-10 w-10 rounded-full border object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = "/default-avatar.png";
                                                }}
                                            />

                                        ) : (

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">

                                                <User
                                                    size={18}
                                                    className="text-slate-500"
                                                />

                                            </div>

                                        )}

                                        <div>

                                            <p className="text-[15px] font-semibold text-navy">

                                                {item.fullName}

                                            </p>

                                            <p className="text-xs text-muted">

                                                BR-{String(item.id).padStart(4, "0")}

                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* Address */}

                                <td className="px-6 py-4 text-[15px] text-muted">

                                    {item.address}

                                </td>

                                {/* Contact */}

                                <td className="px-6 py-4 text-[15px]">

                                    {item.contactNumber}

                                </td>

                                {/* Status */}

                                <td className="px-6 py-4">

                                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                                        ● Active

                                    </span>

                                </td>

                                {/* Action */}

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-slate-500 transition hover:text-navy"
                                        >

                                            <Pencil size={17} />

                                        </button>

                                        <button
                                            onClick={() => onDelete(item)}
                                            className="text-slate-500 transition hover:text-red-600"
                                        >

                                            <Trash2 size={17} />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={5}
                                className="py-12 text-center text-muted"
                            >

                                No borrowers found.

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}