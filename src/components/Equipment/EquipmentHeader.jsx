import { Plus } from "lucide-react";

export default function EquipmentHeader({ onAdd }) {

    return (

        <div className="flex justify-between items-center">

            <div>

                <h1 className="text-3xl font-bold text-slate-800">

                    Equipment Inventory

                </h1>

                <p className="text-slate-500 mt-1">

                    Manage all barangay equipment.

                </p>

            </div>

            <button
                onClick={onAdd}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow transition"
            >

                <Plus size={20} />

                Add Equipment

            </button>

        </div>

    );

}