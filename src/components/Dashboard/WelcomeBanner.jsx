import Seal from "../Seal";
import { CalendarDays, MapPin } from "lucide-react";

export default function WelcomeBanner({
    greeting,
    currentTime,
    activeBorrowings = 0,
    overdueBorrowings = 0,
}) {
    const fullName = localStorage.getItem("fullName") || "Administrator";

    return (
        <div className="fade-up relative overflow-hidden rounded-2xl border border-[#22304f] bg-[#14213d] px-6 py-7 text-white sm:px-8">

            {/* Seal watermark */}
            <div className="pointer-events-none absolute -right-8 -top-10 opacity-[0.07]">
                <Seal size={260} tone="mono" className="text-white" />
            </div>
            {/* gold hairline */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b0892d]/60 to-transparent" />

            <div className="relative flex flex-wrap items-end justify-between gap-6">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b0892d]">
                        {greeting}, {fullName}
                    </p>
                    <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                        Dashboard overview
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-white/60">
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {currentTime.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                            {" · "}
                            {currentTime.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                second: "2-digit",
                            })}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            Barangay Sta. Filomena, Dipolog City
                        </span>
                    </div>
                </div>

                {/* Tally boxes */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center">
                        <div className="tnum text-2xl font-bold">{activeBorrowings}</div>
                        <div className="text-[10px] uppercase tracking-wider text-white/50">
                            Active
                        </div>
                    </div>
                    <div
                        className={`rounded-xl border px-4 py-3 text-center ${
                            overdueBorrowings > 0
                                ? "border-[#b3341f]/30 bg-[#b3341f]/[0.12]"
                                : "border-white/10 bg-white/[0.04]"
                        }`}
                    >
                        <div
                            className={`tnum text-2xl font-bold ${
                                overdueBorrowings > 0 ? "text-[#f6a99b]" : ""
                            }`}
                        >
                            {overdueBorrowings}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-white/50">
                            Overdue
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}