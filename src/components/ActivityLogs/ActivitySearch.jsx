import { Search } from "lucide-react";

export default function ActivitySearch({
    value,
    onChange
}) {
    return (
        <div className="relative">

            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
            />

            <input
                type="text"
                placeholder="Search activity..."
                value={value}
                onChange={onChange}
                className="w-full rounded-2xl border border-line bg-surface py-3 pl-11 pr-4 outline-none focus:border-royal"
            />

        </div>
    );
}