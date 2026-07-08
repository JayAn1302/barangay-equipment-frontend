import { Pencil, Trash2 } from "lucide-react";

export default function BorrowerTable({

    borrowers,
    onEdit,
    onDelete

}) {

    return (

        <div className="bg-white rounded-3xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr className="text-left text-slate-600">

                        <th className="px-6 py-4">Full Name</th>
                        <th className="px-6 py-4">Address</th>
                        <th className="px-6 py-4">Contact Number</th>
                        <th className="px-6 py-4 text-center">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {borrowers.length > 0 ? (

                        borrowers.map((item) => (

                            <tr
                                key={item.id}
                                className="border-t hover:bg-slate-50 transition"
                            >

                                <td className="px-6 py-4 font-semibold">

                                    {item.fullName}

                                </td>

                                <td className="px-6 py-4">

                                    {item.address}

                                </td>

                                <td className="px-6 py-4">

                                    {item.contactNumber}

                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Pencil size={20} />
                                        </button>

                                        <button
                                            onClick={() => onDelete(item)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={20} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={4}
                                className="py-12 text-center text-slate-500"
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