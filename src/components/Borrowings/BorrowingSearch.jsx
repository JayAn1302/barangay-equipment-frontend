import { Search } from "lucide-react";

export default function BorrowingSearch({
    value,
    onChange,
    status,
    onStatusChange,
}) {
    return (
        <div className="fade-up rounded-2xl border border-line bg-surface p-2">

            <div className="flex flex-col gap-3 md:flex-row">

                {/* Search */}

                <div className="relative flex-1">

                    <Search
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                    />

                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="Search borrower, equipment, reference..."
                        className="w-full rounded-xl bg-transparent py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted/70"
                    />

                </div>

                {/* Status Filter */}

                <select
                    value={status}
                    onChange={onStatusChange}
                    className="rounded-xl border border-line bg-ground px-3 py-2.5 text-sm outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/15 md:min-w-[180px]"
                >
                    <option value="All">All Status</option>
                    <option value="Borrowed">Borrowed</option>
                    <option value="Returned">Returned</option>
                    <option value="Overdue">Overdue</option>
                </select>

            </div>

        </div>
    );
}