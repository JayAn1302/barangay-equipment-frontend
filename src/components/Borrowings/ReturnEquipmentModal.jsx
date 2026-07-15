import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function ReturnEquipmentModal({

    open,
    borrowing,
    onClose,
    onSave

}) {

    const [form, setForm] = useState({

        actualReturnDate: "",
        remarks: ""

    });

    useEffect(() => {

        if (open) {

            const today = new Date().toISOString().split("T")[0];

            setForm({

                actualReturnDate: today,
                remarks: ""

            });

        }

    }, [open]);

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl w-[520px] p-8">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">

                        Return Equipment

                    </h2>

                    <button onClick={onClose}>

                        <X />

                    </button>

                </div>

                <div className="space-y-4">

                    <div>

                        <p className="text-slate-500">

                            Borrower

                        </p>

                        <p className="font-semibold">

                            {borrowing?.borrowerName}

                        </p>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            Equipment

                        </p>

                        <p className="font-semibold">

                            {borrowing?.equipmentName}

                        </p>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            Quantity

                        </p>

                        <p className="font-semibold">

                            {borrowing?.quantityBorrowed}

                        </p>

                    </div>

                    <div>

                        <label className="font-medium">

                            Actual Return Date

                        </label>

                        <input

                            type="date"

                            value={form.actualReturnDate}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    actualReturnDate:e.target.value

                                })

                            }

                            className="w-full border rounded-xl p-3 mt-2"

                        />

                    </div>

                    <div>

                        <label className="font-medium">

                            Remarks

                        </label>

                        <textarea

                            rows={3}

                            value={form.remarks}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    remarks:e.target.value

                                })

                            }

                            className="w-full border rounded-xl p-3 mt-2"

                        />

                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button

                        onClick={onClose}

                        className="px-5 py-3 rounded-xl bg-gray-200"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={()=>onSave(form)}

                        className="px-5 py-3 rounded-xl bg-blue-600 text-white"

                    >

                        Confirm Return

                    </button>

                </div>

            </div>

        </div>

    );

}