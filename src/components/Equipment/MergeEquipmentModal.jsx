import { PackagePlus } from "lucide-react";

export default function MergeEquipmentModal({ open, existing, addQuantity, onClose, onConfirm }) {
    if (!open) return null;

    const newTotal = (existing?.existingQuantity ?? 0) + (addQuantity ?? 0);

    return (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

            <div className="animate-modal relative w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-gold/12 ring-1 ring-gold/20">
                        <PackagePlus className="h-8 w-8 text-goldink" />
                    </div>

                    <h2 className="mt-5 font-serif text-xl font-semibold">Equipment Already Exists</h2>
                    <p className="mt-2 text-sm text-muted">
                        <span className="font-semibold text-ink">{existing?.existingName}</span> ({existing?.existingCondition}) already exists with{" "}
                        <span className="font-semibold text-ink">{existing?.existingQuantity}</span> units.
                    </p>
                    <p className="mt-3 text-sm text-muted">
                        Add <span className="font-semibold text-ink">{addQuantity}</span> more to make{" "}
                        <span className="font-semibold text-ink">{newTotal}</span> total?
                    </p>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-[10px] border border-line bg-surface px-5 py-2 text-sm font-semibold transition hover:border-muted/40 hover:bg-ground"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-[10px] bg-navy px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-royal active:translate-y-px"
                    >
                        Add to Existing
                    </button>
                </div>
            </div>
        </div>
    );
}