export default function RecentBorrowings({ borrowings = [] }) {

    return (

        <div className="bg-white rounded-3xl shadow h-[670px] flex flex-col">

            {/* Header */}

            <div className="flex justify-between items-center px-6 py-5">

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">

                        Recent Borrowings

                    </h2>

                    <p className="text-slate-500 mt-1">

                        Showing latest equipment requests

                    </p>

                </div>

                <button className="text-blue-600 font-semibold hover:underline">

                    View All →

                </button>

            </div>

            {/* Alert */}

            <div className="bg-red-50 border-y border-red-100 px-6 py-2 text-red-500 text-sm font-medium">

                ⚠ Please follow up overdue borrowings immediately.

            </div>

            {/* Table */}
            <div className="flex-1 overflow-hidden">
            <table className="w-full">

                <thead className="bg-slate-50 text-slate-500 uppercase text-xs">

                    <tr>

                        <th className="text-left px-5 py-3">REF ID</th>

                        <th className="text-left px-5 py-3">Equipment</th>

                        <th className="text-left px-5 py-3">Borrower</th>

                        <th className="text-left px-5 py-3">Borrow Date</th>

                        <th className="text-left px-5 py-3">Due Date</th>

                        <th className="text-left px-5 py-3">Status</th>

                    </tr>

                </thead>

                <tbody>

                    {borrowings.map((item) => (

                        <tr
                            key={item.id}
                            className="border-t hover:bg-slate-50 transition"
                        >

                            <td className="px-5 py-4 font-semibold text-blue-600">

                                BRN-{String(item.id).padStart(4, "0")}

                            </td>

                            <td className="px-5 py-4">

                                {item.equipmentName}

                            </td>

                            <td className="px-5 py-4">

                                {item.borrowerName}

                            </td>

                            <td className="px-5 py-4">

                                {new Date(item.borrowDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                })}

                            </td>

                            <td
                                className={`px-5 py-4 ${
                                    item.status === "Overdue"
                                        ? "text-red-600 font-semibold"
                                        : ""
                                }`}
                            >

                                {new Date(item.expectedReturnDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                })}

                            </td>

                            <td className="px-5 py-4">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold
                                    ${
                                        item.status === "Borrowed"
                                            ? "bg-green-100 text-green-700"
                                            : item.status === "Returned"
                                            ? "bg-slate-100 text-slate-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {item.status}
                                </span>

                            </td>

                        </tr>

                    ))}

                    {borrowings.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="text-center py-12 text-slate-400"
                            >
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