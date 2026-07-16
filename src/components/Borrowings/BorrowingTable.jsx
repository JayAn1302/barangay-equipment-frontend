import { RotateCcw } from "lucide-react";

export default function BorrowingTable({

    borrowings,
    onReturn

}) {

    return (

        <div className="bg-white rounded-3xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr className="text-left text-slate-600">

                        <th className="px-6 py-4">Reference</th>
                        <th className="px-6 py-4">Borrower</th>
                        <th className="px-6 py-4">Equipment</th>
                        <th className="px-6 py-4">Quantity</th>
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
                                className="border-t hover:bg-slate-50 transition"
                            >

                                <td className="px-6 py-4 font-semibold text-blue-600">

                                    BRN-{String(item.id).padStart(4, "0")}

                                </td>

                                <td className="px-6 py-4">

                                    {item.borrowerName}

                                </td>

                                <td className="px-6 py-4">

                                    {item.equipmentName}

                                </td>

                                <td className="px-6 py-4">

                                    {item.quantityBorrowed}

                                </td>

                                <td className="px-6 py-4">

                                    {new Date(item.borrowDate).toLocaleDateString()}

                                </td>

                                <td className="px-6 py-4">

                                    {new Date(item.expectedReturnDate).toLocaleDateString()}

                                </td>

                                <td className="px-6 py-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold
                                            ${
                                                item.status === "Borrowed"
                                                    ? "bg-green-100 text-green-700"
                                                    : item.status === "Returned"
                                                    ? "bg-slate-100 text-slate-700"
                                                    : item.status === "Overdue"
                                                    ? "bg-red-100 text-red-700"
                                                    : ""
                                            }`}
                                    >

                                        {item.status}

                                    </span>

                                </td>

                               <td className="px-6 py-4">

                                <div className="flex justify-center">

                                    {(item.status === "Borrowed" ||
                                    item.status === "Overdue") && (

                                        <button
                                            onClick={() => onReturn(item)}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition"
                                            title="Return Equipment"
                                        >
                                            <RotateCcw size={16} />
                                            Return
                                        </button>

                                    )}

                                    {item.status === "Returned" && (

                                        <span className="text-gray-400 text-sm">
                                            Returned
                                        </span>

                                    )}

                                </div>

                            </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={8}
                                className="text-center py-12 text-slate-500"
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