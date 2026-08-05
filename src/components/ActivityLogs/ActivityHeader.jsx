import { FileClock } from "lucide-react";

export default function ActivityHeader() {
    return (
        <div className="fade-up flex flex-wrap items-end justify-between gap-4">

            <div className="flex items-stretch gap-4">

                <span className="w-1 shrink-0 rounded-full bg-gradient-to-b from-navy via-royal to-gold" />

                <div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-goldink">
                        System
                    </p>

                    <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight">
                        Activity Logs
                    </h1>

                    <p className="mt-1 text-sm text-muted">
                        View all user activities performed in the system.
                    </p>

                </div>

            </div>

            <div className="flex items-center gap-2 rounded-[10px] border border-line bg-surface px-4 py-2">

                <FileClock
                    size={18}
                    className="text-[#08428C]"
                />

                <span className="text-sm font-semibold text-muted">
                    Audit Trail
                </span>

            </div>

        </div>
    );
}