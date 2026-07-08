import { Search } from "lucide-react";

export default function BorrowerSearch({
    value,
    onChange
}) {
    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">

            <div className="relative">

                <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    placeholder="Search borrower..."
                    value={value}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

        </div>

    );
}