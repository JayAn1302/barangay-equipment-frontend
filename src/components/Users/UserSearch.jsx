import { Search } from "lucide-react";

export default function UserSearch({
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
                placeholder="Search user..."
                value={value}
                onChange={onChange}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />

        </div>
    );
}