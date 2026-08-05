import { UserPlus } from "lucide-react";

export default function BorrowerHeader({ onAdd }) {
    return (
        <div className="fade-up flex flex-wrap items-end justify-between gap-4">

            <div className="flex items-stretch gap-4">

                <span className="w-1 shrink-0 rounded-full bg-gradient-to-b from-navy via-royal to-gold" />

                <div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-goldink">
                        Borrowers
                    </p>

                    <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight">
                        Borrower Management
                    </h1>

                    <p className="mt-1 text-sm text-muted">
                        Manage all registered borrowers.
                    </p>

                </div>

            </div>

            {onAdd && (
                <button
                    onClick={onAdd}
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-royal hover:shadow active:translate-y-px"
                >
                    <UserPlus size={18} />
                    Add Borrower
                </button>
            )}

        </div>
    );
}