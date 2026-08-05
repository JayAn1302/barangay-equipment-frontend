import { Search } from "lucide-react";

export default function EquipmentSearch({ value, onChange }) {
    return (
        <div className="fade-up rounded-2xl border border-line bg-surface p-2">
            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                    type="text"
                    placeholder="Search equipment…"
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-xl bg-transparent py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted/70"
                />
            </div>
        </div>
    );
}