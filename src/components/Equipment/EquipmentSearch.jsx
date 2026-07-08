import { Search } from "lucide-react";

export default function EquipmentSearch({ value, onChange }) {

    return (

        <div className="relative">

            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
                type="text"
                placeholder="Search equipment..."
                value={value}
                onChange={onChange}
                className="w-full bg-white border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

        </div>

    );

}