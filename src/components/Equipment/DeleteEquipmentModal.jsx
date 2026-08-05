import { TriangleAlert } from "lucide-react";

export default function DeleteEquipmentModal({ open, equipment, onClose, onDelete }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

            <div className="animate-modal relative w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-bad/10 ring-1 ring-bad/20">
                        <TriangleAlert className="h-8 w-8 text-bad" />
                    </div>

                    <h2 className="mt-5 font-serif text-xl font-semibold">Delete Equipment</h2>
                    <p className="mt-2 text-sm text-muted">Are you sure you want to delete</p>
                    <p className="mt-1 font-serif text-lg font-semibold">{equipment?.equipmentName}</p>
                    <p className="mt-4 text-xs font-medium text-bad">This action cannot be undone.</p>
                </div>

                <div className="mt-8 flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-[10px] border border-line bg-surface px-5 py-2 text-sm font-semibold transition hover:border-muted/40 hover:bg-ground"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onDelete(equipment.id)}
                        className="rounded-[10px] bg-bad px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 active:translate-y-px"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}