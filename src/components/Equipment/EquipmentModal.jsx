import { X, Boxes } from "lucide-react";
import { useState, useEffect } from "react";

export default function EquipmentModal({ open, onClose, onSave, equipment }) {
    const [form, setForm] = useState({
        equipmentName: "",
        category: "",
        quantity: 1,
        condition: "Good",
    });

    const categories = [
        "Furniture",
        "Electronics",
        "Audio Equipment",
        "Outdoor Equipment",
        "Emergency Equipment",
        "Cleaning Equipment",
        "Office Equipment",
        "Sports Equipment",
        "Others",
    ];

    useEffect(() => {
        if (open) {
            if (equipment) {
                setForm({
                    equipmentName: equipment.equipmentName,
                    category: equipment.category,
                    quantity: equipment.quantity,
                    condition: equipment.condition,
                });
            } else {
                setForm({
                    equipmentName: "",
                    category: "",
                    quantity: 1,
                    condition: "Good",
                });
            }
        }
    }, [open, equipment]);

    if (!open) return null;

    const inputCls =
        "w-full rounded-[10px] border border-line bg-ground px-3 py-2.5 text-sm outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/15 placeholder:text-muted/70";

    return (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

            <div className="animate-modal relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-line px-6 py-4">
                    <div className="flex items-start gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gold/12 text-goldink">
                            <Boxes className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="font-serif text-lg font-semibold">
                                {equipment ? "Edit Equipment" : "Add Equipment"}
                            </h2>
                            <p className="text-xs text-muted">
                                Manage barangay equipment information.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-ground hover:text-ink"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4 px-6 py-5">
                    <Field label="Equipment Code">
                        <input
                            type="text"
                            value={equipment ? equipment.serialNumber : "Automatically Generated"}
                            disabled
                            className={`${inputCls} cursor-not-allowed text-muted`}
                        />
                    </Field>

                    <Field label="Equipment Name">
                        <input
                            className={inputCls}
                            placeholder="e.g. Monobloc Chairs"
                            value={form.equipmentName}
                            onChange={(e) => setForm({ ...form, equipmentName: e.target.value })}
                        />
                    </Field>

                    <Field label="Category">
                        <select
                            className={`${inputCls} appearance-none`}
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Quantity">
                            <input
                                type="number"
                                min={1}
                                className={inputCls}
                                value={form.quantity}
                                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                            />
                        </Field>

                        <Field label="Condition">
                            <select
                                className={`${inputCls} appearance-none`}
                                value={form.condition}
                                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                            >
                                <option>Good</option>
                                <option>Fair</option>
                                <option>Damaged</option>
                            </select>
                        </Field>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-line px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-[10px] border border-line bg-surface px-4 py-2 text-sm font-semibold transition hover:border-muted/40 hover:bg-ground"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(form)}
                        className="rounded-[10px] bg-navy px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-royal active:translate-y-px"
                    >
                        Save Equipment
                    </button>
                </div>
            </div>
        </div>
    );
}

function Field({ label, children }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
            {children}
        </label>
    );
}