import { Pencil, Trash2 } from "lucide-react";

const conditionStyle = {
    Good: "text-[#2f7d4f] bg-[#2f7d4f]/10 ring-[#2f7d4f]/20",
    Fair: "text-[#c98a1e] bg-[#c98a1e]/10 ring-[#c98a1e]/20",
    Damaged: "text-[#b3341f] bg-[#b3341f]/10 ring-[#b3341f]/20",
};

const statusStyle = {
    Available: "text-[#1e3a8a] bg-[#1e3a8a]/10 ring-[#1e3a8a]/20",
    Unavailable: "text-[#6b6a63] bg-[#6b6a63]/10 ring-[#6b6a63]/20",
    "Under Maintenance": "text-[#c98a1e] bg-[#c98a1e]/10 ring-[#c98a1e]/20",
};

export default function EquipmentTable({ equipments, onEdit, onDelete }) {
    const role = localStorage.getItem("role");

    return (
        <div className="fade-up overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-xs uppercase tracking-wider text-muted">
                            {["Serial No.", "Equipment", "Category", "Quantity", "Available", "Condition", "Status", "Action"].map((h) => (
                                <th key={h} className={`px-6 py-3 font-medium ${h === "Action" ? "text-right" : ""}`}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {equipments.length > 0 ? (
                            equipments.map((item, i) => (
                                <tr
                                    key={item.id}
                                    className={`border-t border-line transition hover:bg-royal/[0.03] ${i % 2 ? "bg-ground/40" : ""}`}
                                >
                                    <td className="tnum px-6 py-3.5 font-semibold text-goldink">{item.serialNumber}</td>
                                    <td className="px-6 py-3.5 font-medium">{item.equipmentName}</td>
                                    <td className="px-6 py-3.5 text-muted">{item.category}</td>
                                    <td className="tnum px-6 py-3.5">{item.quantity}</td>
                                    <td className="tnum px-6 py-3.5">{item.availableQuantity}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${conditionStyle[item.condition] || conditionStyle.Damaged}`}>
                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                            {item.condition}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${statusStyle[item.status] || statusStyle.Unavailable}`}>
                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center justify-end gap-1">
                                            {role === "Admin" && (
                                                <>
                                                    <button
                                                        onClick={() => onEdit(item)}
                                                        className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-royal/10 hover:text-royal"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete(item)}
                                                        className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-bad/10 hover:text-bad"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-sm text-muted">
                                    No equipment found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
