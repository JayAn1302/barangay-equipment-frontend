import { Plus } from "lucide-react";

export default function UserHeader({ onAdd }) {
    return (
        <div className="flex items-center justify-between">

            <div>
                <h1 className="text-4xl font-bold text-slate-800">
                    Users
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage system users
                </p>
            </div>

            <button
                onClick={onAdd}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
                <Plus size={18} />
                New User
            </button>

        </div>
    );
}