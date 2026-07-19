import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function BorrowingModal({

    open,
    onClose,
    onSave,
    borrowers,
    equipments,
    saving

}) {

    const [form, setForm] = useState({

        borrowerId: "",
        equipmentId: "",
        quantityBorrowed: 1,
        borrowDate: "",
        expectedReturnDate: "",
        purpose: "",
        remarks: ""

    });

    useEffect(() => {

        if (open) {

            setForm({

                borrowerId: "",
                equipmentId: "",
                quantityBorrowed: 1,
                borrowDate: "",
                expectedReturnDate: "",
                purpose: "",
                remarks: ""

            });

        }

    }, [open]);

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl w-[650px] p-8">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">

                        New Borrowing

                    </h2>

                    <button onClick={onClose}>

                        <X />

                    </button>

                </div>

                <div className="grid grid-cols-2 gap-5">

                    <div>

                        <label>Borrower</label>

                        <select
                            value={form.borrowerId}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    borrowerId:Number(e.target.value)
                                })
                            }
                            className="w-full border rounded-xl p-3 mt-2"
                        >

                            <option value="">Select Borrower</option>

                            {borrowers.map(item=>(
                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.fullName}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div>

                        <label>Equipment</label>

                        <select
                            value={form.equipmentId}
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    equipmentId:Number(e.target.value)
                                })
                            }
                            className="w-full border rounded-xl p-3 mt-2"
                        >

                            <option value="">Select Equipment</option>

                            {equipments
                                .filter(item =>
                                    item.status === "Available" &&
                                    item.availableQuantity > 0
                                )
                                .map(item => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.condition === "Fair"
                                            ? `${item.equipmentName} (Fair Condition)`
                                            : item.equipmentName}
                                    </option>
                            ))}

                        </select>

                    </div>

                    <Input
                        label="Quantity"
                        type="number"
                        value={form.quantityBorrowed}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                quantityBorrowed:Number(e.target.value)
                            })
                        }
                    />

                    <Input
                        label="Borrow Date"
                        type="date"
                        value={form.borrowDate}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                borrowDate:e.target.value
                            })
                        }
                    />

                    <Input
                        label="Expected Return"
                        type="date"
                        value={form.expectedReturnDate}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                expectedReturnDate:e.target.value
                            })
                        }
                    />

                    <Input
                        label="Purpose"
                        value={form.purpose}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                purpose:e.target.value
                            })
                        }
                    />

                </div>

                <div className="mt-5">

                    <label>Remarks</label>

                    <textarea

                        value={form.remarks}

                        onChange={(e)=>
                            setForm({
                                ...form,
                                remarks:e.target.value
                            })
                        }

                        className="w-full border rounded-xl p-3 mt-2"

                        rows={3}

                    />

                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button

                        onClick={onClose}

                        className="px-5 py-3 rounded-xl bg-gray-200"

                    >

                        Cancel

                    </button>

                    <button
                        disabled={saving}
                        onClick={() => onSave(form)}
                        className={`px-5 py-3 rounded-xl text-white transition
                            ${
                                saving
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {saving ? "Saving..." : "Save Borrowing"}
                    </button>

                </div>

            </div>

        </div>

    );

}

function Input({

    label,

    ...props

}){

    return(

        <div>

            <label>{label}</label>

            <input

                {...props}

                className="w-full border rounded-xl p-3 mt-2"

            />

        </div>

    );

}