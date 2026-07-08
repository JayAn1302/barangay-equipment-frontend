import { UserPlus } from "lucide-react";

export default function BorrowerHeader({ onAdd }) {
    return (
        <div className="flex items-center justify-between">

            <div>
                <h1 className="text-3xl font-bold text-slate-800">
                    Borrowers
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage registered borrowers.
                </p>
            </div>

            <button
                onClick={onAdd}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
            >
                <UserPlus size={20} />
                Add Borrower
            </button>

        </div>
    );
}