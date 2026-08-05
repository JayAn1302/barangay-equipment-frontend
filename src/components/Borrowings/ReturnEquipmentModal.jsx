import { useEffect, useState } from "react";
import {
    X,
    User,
    Package,
    CalendarDays,
    FileText,
    RotateCcw,
    ClipboardList,
    Calendar,
    MessageCircle,
} from "lucide-react";

export default function ReturnEquipmentModal({
    open,
    borrowing,
    onClose,
    onSave,
}) {
    const [form, setForm] = useState({
        actualReturnDate: "",
        remarks: "",
        items: [],
    });

    useEffect(() => {
        if (open) {
            const today = new Date().toISOString().split("T")[0];

            setForm({
                actualReturnDate: today,
                remarks: "",
                items:
                    borrowing?.items?.map((item) => ({
                        equipmentId: item.equipmentId,
                        quantityReturned: 0,
                    })) || [],
            });
        }
    }, [open, borrowing]);

    if (!open) return null;

    const inputCls =
        "w-full rounded-xl border border-line bg-ground px-3 py-2.5 text-sm outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/15";

    const hasRemaining = borrowing?.items?.some(
        item => item.quantityBorrowed > item.quantityReturned
    );

    return (
        <div className="fixed inset-0 z-50 grid place-items-center p-5">

            {/* Backdrop */}

            <div
                className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}

            <div className="animate-modal relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
                {/* Header */}

                <div className="flex items-center justify-between border-b border-line px-8 py-5">

                    <div className="flex items-center gap-4">

                        <div className="grid h-14 w-14 place-items-center rounded-full bg-gold/10">

                            <RotateCcw className="h-7 w-7 text-goldink" />

                        </div>

                        <div>

                            <h2 className="font-serif text-3xl font-semibold text-navy">

                                Return Equipment

                            </h2>

                            <p className="text-sm text-muted">

                                Process the return of borrowed equipment.

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="grid h-10 w-10 place-items-center rounded-lg hover:bg-ground"
                    >
                        <X className="h-6 w-6 text-muted" />
                    </button>

                </div>

                {/* Main Content */}

                <div className="grid flex-1 grid-cols-12 gap-8 overflow-y-auto p-8">

                    {/* LEFT PANEL */}

                    <div className="col-span-4 rounded-2xl border border-line bg-white p-5 shadow-sm">

                        <div className="mb-5 flex items-center gap-3">

                            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50">

                                <ClipboardList className="h-5 w-5 text-navy" />

                            </div>

                            <div>

                                <h3 className="font-semibold text-navy">

                                    Borrowing Details

                                </h3>

                                <p className="text-xs text-muted">

                                    Transaction information

                                </p>

                            </div>

                        </div>

                        <Field label="Borrower">

                            <div className={`${inputCls} flex items-center gap-3`}>

                                <User className="h-4 w-4 text-muted" />

                                {borrowing?.borrowerName}

                            </div>

                        </Field>

                        <Field label="Borrow Date">

                            <div className={`${inputCls} flex items-center gap-3`}>

                                <Calendar className="h-4 w-4 text-muted" />

                                {new Date(
                                    borrowing?.borrowDate
                                ).toLocaleDateString("en-PH")}

                            </div>

                        </Field>

                        <Field label="Expected Return">

                            <div className={`${inputCls} flex items-center gap-3`}>

                                <CalendarDays className="h-4 w-4 text-muted" />

                                {new Date(
                                    borrowing?.expectedReturnDate
                                ).toLocaleDateString("en-PH")}

                            </div>

                        </Field>

                        <Field label="Status">

                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                                {borrowing?.status}

                            </span>

                        </Field>

                        <Field label="Purpose">

                            <div className={`${inputCls} flex items-center gap-3`}>

                                <MessageCircle className="h-4 w-4 text-muted" />

                                {borrowing?.purpose || "N/A"}

                            </div>

                        </Field>

                    </div>

                    {/* RIGHT PANEL */}

                    <div className="col-span-7 space-y-5">

            {/* Equipment Card */}

<div className="rounded-2xl border border-line bg-white shadow-sm">

    <div className="border-b border-line px-6 py-4">

        <h3 className="font-semibold text-navy">

            Equipment to Return

        </h3>

        <p className="text-xs text-muted">

            Select the quantity to return for each borrowed equipment.

        </p>

    </div>

    <div className="max-h-[320px] space-y-4 overflow-y-auto p-6">

        {borrowing?.items?.map((item, index) => {

            const remaining =
                item.quantityBorrowed -
                item.quantityReturned;

            return (

                <div
                    key={index}
                    className="rounded-xl border border-line bg-ground p-5"
                >

                    <div className="flex items-start justify-between">

                        <div className="flex items-center gap-3">

                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50">

                                <Package className="h-6 w-6 text-navy" />

                            </div>

                            <div>

                                <h4 className="text-base font-semibold text-navy">

                                    {item.equipmentName}

                                </h4>

                                <p className="text-xs text-muted">

                                    Equipment Item

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Statistics */}

                    <div className="mt-5 grid grid-cols-3 gap-4">

                        <div className="rounded-lg bg-slate-100 p-3 text-center">

                            <p className="text-xs text-muted">

                                Borrowed

                            </p>

                            <p className="mt-1 text-lg font-bold text-navy">

                                {item.quantityBorrowed}

                            </p>

                        </div>

                        <div className="rounded-lg bg-green-100 p-3 text-center">

                            <p className="text-xs text-green-700">

                                Returned

                            </p>

                            <p className="mt-1 text-lg font-bold text-green-700">

                                {item.quantityReturned}

                            </p>

                        </div>

                        <div className="rounded-lg bg-orange-100 p-3 text-center">

                            <p className="text-xs text-orange-700">

                                Remaining

                            </p>

                            <p className="mt-1 text-lg font-bold text-orange-700">

                                {remaining}

                            </p>

                        </div>

                    </div>

                    {/* Quantity */}

                    <div className="mt-5">

                        <label className="mb-2 block text-sm font-medium text-navy">

                            Return Quantity

                        </label>

                        <input
                            type="number"
                            min={0}
                            max={remaining}
                            value={
                                form.items[index]?.quantityReturned ?? 0
                            }
                            onChange={(e) => {

                                let value =
                                    Number(e.target.value);

                                if (value < 0) value = 0;

                                if (value > remaining)
                                    value = remaining;

                                const updated = [...form.items];

                                updated[index].quantityReturned = value;

                                setForm({

                                    ...form,

                                    items: updated,

                                });

                            }}
                            className={inputCls}
                        />

                    </div>

                </div>

            );

        })}

    </div>

</div>
        {/* Return Information */}

<div className="rounded-2xl border border-line bg-white p-6 shadow-sm">

    <div className="grid grid-cols-2 gap-6">

        {/* Return Date */}

        <Field label="Actual Return Date">

            <div className="relative">

                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

                <input
                    type="date"
                    value={form.actualReturnDate}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            actualReturnDate: e.target.value,
                        })
                    }
                    className={`${inputCls} pl-10`}
                />

            </div>

        </Field>

        {/* Empty column for spacing */}

        <div />

    </div>

    <div className="mt-6">

        <Field label="Remarks">

            <div className="relative">

                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted" />

                <textarea
                    rows={5}
                    value={form.remarks}
                    placeholder="Enter remarks about the returned equipment..."
                    onChange={(e) =>
                        setForm({
                            ...form,
                            remarks: e.target.value,
                        })
                    }
                    className={`${inputCls} pl-10 resize-none`}
                />

            </div>

        </Field>

    </div>

</div>

          </div> {/* End RIGHT PANEL */}

</div> {/* End Main Content */}

{/* Footer */}

<div className="flex justify-end gap-3 border-t border-line bg-white px-8 py-5">
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-semibold transition hover:bg-ground"
                    >

                        Cancel

                    </button>

                    <button
                        disabled={!hasRemaining}
                        onClick={() => {

                            const items = form.items.filter(
                                item => item.quantityReturned > 0
                            );

                            if (items.length === 0) {

                                alert("Please enter a return quantity.");

                                return;

                            }

                            onSave({

                                actualReturnDate: form.actualReturnDate,

                                remarks: form.remarks,

                                items,

                            });

                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-royal disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <RotateCcw className="h-4 w-4" />

                        Confirm Return

                    </button>

                </div>

            </div>

        </div>

    );
}

function Field({ label, children }) {
    return (
        <label className="block">

            <span className="mb-2 block text-sm font-medium text-muted">

                {label}

            </span>

            {children}

        </label>
    );
}