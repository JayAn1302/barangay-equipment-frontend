import { useEffect, useState } from "react";
import {
    X,
    ClipboardPlus,
    User,
    Package,
    CalendarDays,
    Hash,
    Target,
    FileText,
    Trash2,
    Plus,
} from "lucide-react";

export default function BorrowingModal({
    open,
    onClose,
    onSave,
    borrowers,
    equipments,
    saving,
}) {

    const [form, setForm] = useState({
        borrowerId: "",
        borrowDate: new Date().toISOString().split("T")[0],
        expectedReturnDate: "",
        purpose: "",
        remarks: "",
        items: [
            {
                equipmentId: "",
                quantityBorrowed: 1,
            },
        ],
    });

    useEffect(() => {
        if (open) {
            setForm({
                borrowerId: "",
                borrowDate: new Date().toISOString().split("T")[0],
                expectedReturnDate: "",
                purpose: "",
                remarks: "",
                items: [
                    {
                        equipmentId: "",
                        quantityBorrowed: 1,
                    },
                ],
            });
        }
    }, [open]);

    if (!open) return null;

    const inputCls =
        "w-full rounded-[10px] border border-line bg-ground px-3 py-2.5 text-sm outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/15 placeholder:text-muted/70";

    return (

        <div className="fixed inset-0 z-50 grid place-items-center p-4">

            {/* Backdrop */}

            <div
                className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}

            <div className="animate-modal relative flex w-full max-w-[850px] max-h-[88vh] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">

                {/* Header */}

                <div className="flex items-start justify-between border-b border-line px-6 py-4">

                    <div className="flex items-start gap-3">

                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gold/12 text-goldink">

                            <ClipboardPlus className="h-5 w-5" />

                        </div>

                        <div>

                            <h2 className="font-serif text-lg font-semibold">

                                New Borrowing

                            </h2>

                            <p className="text-xs text-muted">

                                Create a new equipment borrowing transaction.

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

                <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
                
                {/* Borrower */}

<Field label="Borrower">

    <select
        className={`${inputCls} appearance-none`}
        value={form.borrowerId}
        onChange={(e) =>
            setForm({
                ...form,
                borrowerId: Number(e.target.value),
            })
        }
    >
        <option value="">Select Borrower</option>

        {borrowers.map((item) => (

            <option
                key={item.id}
                value={item.id}
            >
                {item.fullName}
            </option>

        ))}

    </select>

</Field>

{/* Equipment Section */}

<div className="space-y-4">

    {form.items.map((item, index) => (

        <div
        key={index}
        className="rounded-2xl border border-line bg-surface p-5 shadow-sm transition-all hover:shadow-md"
    >

            <div className="mb-5 flex items-center justify-between">

    <div className="flex items-center gap-2">

        <div className="grid h-8 w-8 place-items-center rounded-lg bg-navy/10">

            <Package
                size={16}
                className="text-navy"
            />

        </div>

        <div>

            <p className="text-sm font-semibold text-navy">

                Equipment {index + 1}

            </p>

            <p className="text-xs text-muted">

                Select equipment and quantity.

            </p>

        </div>

    </div>

    {form.items.length > 1 && (

        <button
            type="button"
            onClick={() => {

                const updatedItems =
                    form.items.filter((_, i) => i !== index);

                setForm({

                    ...form,

                    items: updatedItems,

                });

            }}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
        >

            <Trash2 size={14}/>

            Remove

        </button>

    )}

</div>

            <div className="grid grid-cols-2 gap-4">

                {/* Equipment */}

                <Field label="Equipment">

                    <select
                        className={`${inputCls} appearance-none`}
                        value={item.equipmentId}
                        onChange={(e) => {

                            const updatedItems = [...form.items];

                            updatedItems[index].equipmentId =
                                Number(e.target.value);

                            setForm({
                                ...form,
                                items: updatedItems,
                            });

                        }}
                    >

                        <option value="">

                            Select Equipment

                        </option>

                        {equipments

                            .filter((eq) => {

                                const selectedIds = form.items.map(
                                    (i, iIndex) =>
                                        iIndex === index
                                            ? null
                                            : Number(i.equipmentId)
                                );

                                return (

                                    eq.condition !== "Damaged" &&

                                    eq.availableQuantity > 0 &&

                                    !selectedIds.includes(eq.id)

                                );

                            })

                            .map((eq) => (

                                <option
                                    key={eq.id}
                                    value={eq.id}
                                >

                                    {eq.equipmentName} — {eq.condition} ({eq.availableQuantity} available)

                                </option>

                            ))}

                    </select>

                </Field>

                {item.equipmentId && (() => {

    const selected = equipments.find(
        e => e.id === item.equipmentId
    );

    if (!selected) return null;

    return (

        <div className="mb-4 rounded-xl border border-line bg-ground p-4">

            <div className="flex items-center gap-2">

                <Package
                    size={18}
                    className="text-navy"
                />

                <span className="font-semibold text-navy">

                    {selected.equipmentName}

                </span>

            </div>

            <div className="mt-3 grid grid-cols-3 gap-4 text-xs">

                <div>

                    <p className="text-muted">

                        Available

                    </p>

                    <p className="font-semibold">

                        {selected.availableQuantity}

                    </p>

                </div>

                <div>

                    <p className="text-muted">

                        Condition

                    </p>

                    <p className="font-semibold">

                        {selected.condition}

                    </p>

                </div>

                <div>

                    <p className="text-muted">

                        Status

                    </p>

                    <p className="font-semibold text-green-600">

                        Ready

                    </p>

                </div>

            </div>

        </div>

    );

})()}

                {/* Quantity */}

                <Field label="Quantity">

                    <input
                        type="number"
                        min={1}
                        max={
                            equipments.find(
                                (e) => e.id === item.equipmentId
                            )?.availableQuantity || 1
                        }
                        disabled={!item.equipmentId}
                        value={item.quantityBorrowed}
                        className={inputCls}
                        onChange={(e) => {

                            const qty = Number(e.target.value);

                            const equipment =
                                equipments.find(
                                    (x) => x.id === item.equipmentId
                                );

                            const updatedItems = [...form.items];

                            updatedItems[index].quantityBorrowed =
                                Math.min(
                                    qty,
                                    equipment?.availableQuantity || qty
                                );

                            setForm({

                                ...form,

                                items: updatedItems,

                            });

                        }}
                    />

                </Field>

            </div>

        </div>

    ))}

    {/* Add Equipment */}

    <button
        type="button"
        onClick={() => {

            setForm({

                ...form,

                items: [

                    ...form.items,

                    {

                        equipmentId: "",

                        quantityBorrowed: 1,

                    },

                ],

            });

        }}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-ground px-4 py-3 text-sm font-semibold text-navy transition-all hover:border-royal hover:bg-surface hover:shadow-sm"
    >

        <Plus size={16} />

        Add Equipment

    </button>

</div>

{/* Dates */}

<div className="grid grid-cols-2 gap-4">

    <Field label="Borrow Date">

        <input
            type="date"
            className={inputCls}
            value={form.borrowDate}
            onChange={(e) =>
                setForm({

                    ...form,

                    borrowDate: e.target.value,

                })
            }
        />

    </Field>

    <Field label="Expected Return">

        <input
    type="date"
    className={inputCls}
    min={form.borrowDate}
    value={form.expectedReturnDate}
            onChange={(e) =>
                setForm({

                    ...form,

                    expectedReturnDate: e.target.value,

                })
            }
        />

    </Field>

</div>

{/* Purpose */}

<Field label="Purpose">

    <input
        className={inputCls}
        placeholder="e.g. Barangay Fiesta"
        value={form.purpose}
        onChange={(e) =>
            setForm({

                ...form,

                purpose: e.target.value,

            })
        }
    />

</Field>

{/* Remarks */}

<Field label="Remarks">

    <textarea
        rows={4}
        placeholder="Enter additional notes (optional)..."
        value={form.remarks}
        onChange={(e) =>
            setForm({
                ...form,
                remarks: e.target.value,
            })
        }
        className={`${inputCls} resize-none`}
    />

</Field>

</div>

{/* Footer */}

<div className="sticky bottom-0 flex justify-end gap-3 border-t border-line bg-surface px-6 py-4">

    <button
        onClick={onClose}
        className="rounded-[10px] border border-line bg-surface px-4 py-2 text-sm font-semibold transition hover:border-muted/40 hover:bg-ground"
    >
        Cancel
    </button>

    <button
        disabled={saving}
        onClick={() => {

            if (!form.borrowerId) {
                return alert("Please select a borrower.");
            }

            if (form.items.some((i) => !i.equipmentId)) {
                return alert("Please select all equipment.");
            }

            if (form.items.some((i) => i.quantityBorrowed <= 0)) {
                return alert("Quantity must be greater than zero.");
            }

            onSave(form);

        }}
        className="rounded-[10px] bg-navy px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-royal disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-px"
    >
        {saving ? "Saving..." : "Save Borrowing"}
    </button>

</div>

</div>

</div>

);
}

function Field({ label, children }) {

    return (

        <label className="block">

            <span className="mb-1.5 block text-xs font-medium text-muted">

                {label}

            </span>

            {children}

        </label>

    );

}