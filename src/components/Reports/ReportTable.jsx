export default function ReportTable({ activeTab, reports }) {

    if (reports.length === 0) {

        return (
            <div className="bg-white rounded-3xl shadow p-10 text-center text-slate-500">
                No records found.
            </div>
        );

    }

    return (

        <div className="bg-white rounded-3xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr>

                        {/* Borrowings Report */}

                        {activeTab === "borrowings" && (
                            <>
                                <th className="px-6 py-4 text-left">Reference</th>
                                <th className="px-6 py-4 text-left">Borrower</th>
                                <th className="px-6 py-4 text-left">Equipment</th>
                                <th className="px-6 py-4 text-left">Quantity</th>
                                <th className="px-6 py-4 text-left">Borrow Date</th>
                                <th className="px-6 py-4 text-left">Expected Return</th>
                                <th className="px-6 py-4 text-left">Status</th>
                            </>
                        )}

                        {/* Equipment Report */}

                        {activeTab === "equipment" && (
                            <>
                                <th className="px-6 py-4 text-left">Equipment</th>
                                <th className="px-6 py-4 text-left">Category</th>
                                <th className="px-6 py-4 text-left">Total</th>
                                <th className="px-6 py-4 text-left">Available</th>
                                <th className="px-6 py-4 text-left">Borrowed</th>
                                <th className="px-6 py-4 text-left">Status</th>
                            </>
                        )}

                        {/* Overdue Report */}

                        {activeTab === "overdue" && (
                            <>
                                <th className="px-6 py-4 text-left">Reference</th>
                                <th className="px-6 py-4 text-left">Borrower</th>
                                <th className="px-6 py-4 text-left">Equipment</th>
                                <th className="px-6 py-4 text-left">Quantity</th>
                                <th className="px-6 py-4 text-left">Due Date</th>
                                <th className="px-6 py-4 text-left">Days Overdue</th>
                            </>
                        )}

                    </tr>

                </thead>

                <tbody>

                    {reports.map((item, index) => (

                        <tr
                            key={index}
                            className="border-t hover:bg-slate-50"
                        >

                            {activeTab === "borrowings" && (
                                <>
                                    <td className="px-6 py-4 font-semibold text-blue-600">
                                        {item.referenceNo}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.borrower}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.equipment}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.quantity}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.borrowDate}
                                    </td>

                                    <td className="px-6 py-4">
                                        {item.expectedReturnDate}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold
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
                                    <td className="px-6 py-4">{item.equipment}</td>
                                    <td className="px-6 py-4">{item.category}</td>
                                    <td className="px-6 py-4">{item.totalQuantity}</td>
                                    <td className="px-6 py-4">{item.availableQuantity}</td>
                                    <td className="px-6 py-4">{item.borrowedQuantity}</td>
                                    <td className="px-6 py-4">{item.status}</td>
                                </>
                            )}

                            {activeTab === "overdue" && (
                                <>
                                    <td className="px-6 py-4 font-semibold text-blue-600">
                                        {item.referenceNo}
                                    </td>

                                    <td className="px-6 py-4">{item.borrower}</td>

                                    <td className="px-6 py-4">{item.equipment}</td>

                                    <td className="px-6 py-4">{item.quantity}</td>

                                    <td className="px-6 py-4">{item.dueDate}</td>

                                    <td className="px-6 py-4 text-red-600 font-semibold">
                                        {item.daysOverdue} day(s)
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