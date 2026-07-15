import { Plus } from "lucide-react";

export default function BorrowingHeader({ onAdd }) {

    return (

        <div className="flex justify-between items-center">

            <div>

                <h1 className="text-3xl font-bold text-slate-800">

                    Borrowings

                </h1>

                <p className="text-slate-500 mt-1">

                    Manage equipment borrowing records

                </p>

            </div>

            <button

                onClick={onAdd}

                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"

            >

                <Plus size={20} />

                New Borrowing

            </button>

        </div>

    );

}