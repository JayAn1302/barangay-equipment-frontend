import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function EquipmentModal({

    open,
    onClose,
    onSave,
    equipment

}) {

    const [form, setForm] = useState({

        equipmentName: "",
        category: "",
        quantity: 1,
        condition: "Good"

    });

    useEffect(() => {

    if (open) {

        if (equipment) {

            // Edit mode
            setForm({
                equipmentName: equipment.equipmentName,
                category: equipment.category,
                quantity: equipment.quantity,
                condition: equipment.condition
            });

        } else {

            // Add mode
            setForm({
                equipmentName: "",
                category: "",
                quantity: 1,
                condition: "Good"
            });

        }

    }

}, [open, equipment]);

if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl w-[520px] p-8 shadow-2xl">

                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-2xl font-bold">

                        {equipment ? "Edit Equipment" : "Add Equipment"}

                    </h2>

                    <button onClick={onClose}>

                        <X />

                    </button>

                </div>

                <div className="space-y-5">

                    <Input
                        label="Equipment Name"
                        value={form.equipmentName}
                        onChange={e =>
                            setForm({
                                ...form,
                                equipmentName: e.target.value
                            })
                        }
                    />

                    <Input
                        label="Category"
                        value={form.category}
                        onChange={e =>
                            setForm({
                                ...form,
                                category: e.target.value
                            })
                        }
                    />

                    <Input
                        type="number"
                        label="Quantity"
                        value={form.quantity}
                        onChange={e =>
                            setForm({
                                ...form,
                                quantity: Number(e.target.value)
                            })
                        }
                    />


                    <div>

                        <label className="font-medium">

                            Condition

                        </label>

                        <select
                            className="w-full border rounded-xl p-3 mt-2"
                            value={form.condition}
                            onChange={e =>
                                setForm({
                                    ...form,
                                    condition: e.target.value
                                })
                            }
                        >

                            <option>Good</option>
                            <option>Fair</option>
                            <option>Damaged</option>

                        </select>

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
                        onClick={() => onSave(form)}
                        className="px-5 py-3 rounded-xl bg-blue-600 text-white"
                    >

                        Save Equipment

                    </button>

                </div>

            </div>

        </div>

    );

}

function Input({

    label,
    ...props

}) {

    return (

        <div>

            <label className="font-medium">

                {label}

            </label>

            <input
                {...props}
                className="w-full border rounded-xl p-3 mt-2"
            />

        </div>

    );

}