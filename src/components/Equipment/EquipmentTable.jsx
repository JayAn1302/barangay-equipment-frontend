import { Pencil, Trash2 } from "lucide-react";

export default function EquipmentTable({
    equipments,
    onEdit,
    onDelete
}) {

    return (

        <div className="bg-white rounded-3xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr className="text-left text-slate-600">

                        <th className="px-6 py-4">Equipment</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Quantity</th>
                        <th className="px-6 py-4">Available</th>
                        <th className="px-6 py-4">Condition</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-center">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {equipments.length > 0 ? (

                        equipments.map((item) => (

                            <tr
                                key={item.id}
                                className="border-t hover:bg-slate-50 transition"
                            >

                                <td className="px-6 py-4 font-semibold">

                                    {item.equipmentName}

                                </td>

                                <td className="px-6 py-4">

                                    {item.category}

                                </td>

                                <td className="px-6 py-4">

                                    {item.quantity}

                                </td>

                                <td className="px-6 py-4">

                                    {item.availableQuantity}

                                </td>

                                <td className="px-6 py-4">

                                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                                        ${
                                            item.condition === "Good"
                                                ? "bg-green-100 text-green-700"
                                                : item.condition === "Fair"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {item.condition}
                                    </span>

                                </td>

                                <td className="px-6 py-4">

                                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                                        ${
                                            item.status === "Available"
                                                ? "bg-blue-100 text-blue-700"
                                                : item.status === "Unavailable"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-orange-100 text-orange-700"
                                        }`}
                                    >
                                        {item.status}
                                    </span>

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
                                colSpan={7}
                                className="py-12 text-center text-slate-500"
                            >
                                No equipment found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}