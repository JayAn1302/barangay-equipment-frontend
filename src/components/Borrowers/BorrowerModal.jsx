import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function BorrowerModal({

    open,
    onClose,
    onSave,
    borrower

}) {

    const [form, setForm] = useState({

        fullName: "",
        address: "",
        contactNumber: ""

    });

    useEffect(() => {

    if (borrower) {

        setForm({

            fullName: borrower.fullName,
            address: borrower.address,
            contactNumber: borrower.contactNumber

        });

    }

    else {

        setForm({

            fullName: "",
            address: "",
            contactNumber: ""

        });

    }

}, [borrower]);

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl w-[500px] p-8 shadow-2xl">

                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-2xl font-bold">

                        {borrower ? "Edit Borrower" : "Add Borrower"}

                    </h2>

                    <button onClick={onClose}>

                        <X />

                    </button>

                </div>

                <div className="space-y-5">

                    <Input
                        label="Full Name"
                        value={form.fullName}
                        onChange={e =>
                            setForm({
                                ...form,
                                fullName: e.target.value
                            })
                        }
                    />

                    <Input
                        label="Address"
                        value={form.address}
                        onChange={e =>
                            setForm({
                                ...form,
                                address: e.target.value
                            })
                        }
                    />

                    <Input
                        label="Contact Number"
                        value={form.contactNumber}
                        onChange={e =>
                            setForm({
                                ...form,
                                contactNumber: e.target.value
                            })
                        }
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
                        onClick={() => onSave(form)}
                        className="px-5 py-3 rounded-xl bg-blue-600 text-white"
                    >

                        Save Borrower

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