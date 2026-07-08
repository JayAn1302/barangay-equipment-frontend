import { TriangleAlert } from "lucide-react";

export default function DeleteEquipmentModal({

    open,
    equipment,
    onClose,
    onDelete

}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl w-[430px] p-8 shadow-2xl">

                <div className="flex flex-col items-center">

                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

                        <TriangleAlert
                            className="text-red-600"
                            size={32}
                        />

                    </div>

                    <h2 className="text-2xl font-bold mt-5">

                        Delete Equipment

                    </h2>

                    <p className="text-slate-500 text-center mt-3">

                        Are you sure you want to delete

                    </p>

                    <p className="font-bold text-lg mt-2">

                        {equipment?.equipmentName}

                    </p>

                    <p className="text-red-500 mt-4 text-sm">

                        This action cannot be undone.

                    </p>

                </div>

                <div className="flex justify-center gap-4 mt-8">

                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
                    >

                        Cancel

                    </button>

                    <button
                        onClick={() => onDelete(equipment.id)}
                        className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}