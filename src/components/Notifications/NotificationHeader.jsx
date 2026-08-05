import { Bell } from "lucide-react";

export default function NotificationHeader() {
    return (
        <div className="fade-up flex items-center justify-between">

            <div className="flex items-stretch gap-4">

                <span className="w-1 shrink-0 rounded-full bg-gradient-to-b from-navy via-royal to-gold" />

                <div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-goldink">
                        Activity Center
                    </p>

                    <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight">
                        Notifications
                    </h1>

                    <p className="mt-1 text-sm text-muted">
                        Stay updated with equipment borrowing activities and system alerts.
                    </p>

                </div>

            </div>

            <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-100">

                <Bell className="h-6 w-6 text-navy" />

            </div>

        </div>
    );
}