export default function ReportHeader() {
    return (
        <div className="fade-up flex flex-wrap items-end justify-between gap-4">

            {/* Left */}

            <div className="flex items-stretch gap-4">

                <span className="w-1 shrink-0 rounded-full bg-gradient-to-b from-navy via-royal to-gold" />

                <div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-goldink">
                        Analytics
                    </p>

                    <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-ink">
                        Reports &amp; Analytics
                    </h1>

                    <p className="mt-1 text-sm text-muted">
                        Export operational summaries.
                    </p>

                </div>

            </div>

        </div>
    );
}