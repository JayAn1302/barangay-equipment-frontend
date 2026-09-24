import { X, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function BorrowerModal({
    open,
    onClose,
    onSave,
    borrower,
}) {

    const [form, setForm] = useState({
        fullName: "",
        address: "",
        contactNumber: "",
        photo: null,
    });

    const [preview, setPreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (open) {

               setErrors({});

            if (borrower) {

                setForm({
                    fullName: borrower.fullName,
                    address: borrower.address,
                    contactNumber: borrower.contactNumber,
                    photo: null,
                });

                if (borrower.photoPath) {
                    setPreview(`https://barangayequipment2.runasp.net/${borrower.photoPath}`);
                } else {
                    setPreview(null);
                }

            } else {

                setForm({
                    fullName: "",
                    address: "",
                    contactNumber: "",
                    photo: null,
                });

                setPreview(null);

            }

            setSaving(false);
        }

    }, [open, borrower]);

    if (!open) return null;

    const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_PHOTO_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

function handleImageChange(e) {

    const file = e.target.files[0];

    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setErrors((prev) => ({
            ...prev,
            photo: "Only JPG or PNG images are allowed.",
        }));
        e.target.value = "";
        return;
    }

    if (file.size > MAX_PHOTO_SIZE_BYTES) {
        setErrors((prev) => ({
            ...prev,
            photo: "Photo must be 2MB or smaller.",
        }));
        e.target.value = "";
        return;
    }

    setErrors((prev) => ({ ...prev, photo: undefined }));

    setForm({
        ...form,
        photo: file,
    });

    setPreview(URL.createObjectURL(file));
}

    const inputCls =
        "w-full rounded-[10px] border border-line bg-ground px-3 py-2.5 text-sm outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/15 placeholder:text-muted/70";

    return (

        <div className="fixed inset-0 z-50 grid place-items-center p-4">

            <div
                className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="animate-modal relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">

                {/* Header */}

                <div className="flex items-start justify-between border-b border-line px-6 py-4">

                    <div className="flex items-start gap-3">

                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gold/12 text-goldink">

                            <UserPlus className="h-5 w-5" />

                        </div>

                        <div>

                            <h2 className="font-serif text-lg font-semibold">

                                {borrower ? "Edit Borrower" : "Add Borrower"}

                            </h2>

                            <p className="text-xs text-muted">

                                Manage borrower information.

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-ground hover:text-ink"
                    >

                        <X className="h-4 w-4" />

                    </button>

                </div>

                {/* Body */}

                <div className="space-y-4 px-6 py-5">

                    {/* Photo */}

                    <Field label="Borrower Photo">

                        <div className="rounded-xl border-2 border-dashed border-line p-5 text-center">

                            {preview ? (

                                <img
                                    src={preview}
                                    alt="Borrower"
                                    className="mx-auto mb-4 h-24 w-24 rounded-full border object-cover"
                                />

                            ) : (

                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-ground">

                                    <UserPlus
                                        className="h-8 w-8 text-muted"
                                    />

                                </div>

                            )}

                            <input
                                id="borrower-photo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />

                            <label
                                htmlFor="borrower-photo"
                                className="inline-flex cursor-pointer items-center rounded-[10px] bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-royal"
                            >
                                Upload Photo
                            </label>

                                                        <p className="mt-2 text-xs text-muted">

                                JPG, PNG (Maximum 2MB)

                            </p>

                            {errors.photo && (
                                <p className="mt-2 text-xs text-red-500">{errors.photo}</p>
                            )}

                        </div>

                    </Field>

                    <Field label="Full Name">

                        <input
                            className={inputCls}
                            placeholder="Enter borrower name"
                            value={form.fullName}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    fullName: e.target.value,
                                })
                            }
                        />

                    </Field>
                    {errors.fullName && (
                        <p className="-mt-2 text-xs text-red-500">{errors.fullName}</p>
                    )}

                    <Field label="Address">

                        <input
                            className={inputCls}
                            placeholder="Enter address"
                            value={form.address}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    address: e.target.value,
                                })
                            }
                        />

                    </Field>
                    {errors.address && (
                        <p className="-mt-2 text-xs text-red-500">{errors.address}</p>
                    )}

                    <Field label="Contact Number">

                        <input
                            className={inputCls}
                            placeholder="09XXXXXXXXX"
                            maxLength={11}
                            inputMode="numeric"
                            value={form.contactNumber}
                            onChange={(e) => {

                                const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 11);

                                setForm({
                                    ...form,
                                    contactNumber: digitsOnly,
                                });

                            }}
                        />

                    </Field>
                    {errors.contactNumber && (
                        <p className="-mt-2 text-xs text-red-500">{errors.contactNumber}</p>
                )}

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t border-line px-6 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-[10px] border border-line bg-surface px-4 py-2 text-sm font-semibold transition hover:border-muted/40 hover:bg-ground"
                    >
                        Cancel
                    </button>

                    <button
                            disabled={saving}
                            onClick={async () => {

                                if (saving) return;

                                const newErrors = {};

                                if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
                                if (!form.address.trim()) newErrors.address = "Address is required";

                                if (!/^09\d{9}$/.test(form.contactNumber)) {
                                    newErrors.contactNumber = "Enter a valid 11-digit number starting with 09";
                                }

                                if (Object.keys(newErrors).length > 0) {
                                    setErrors(newErrors);
                                    return;
                                }

                                setErrors({});
                                setSaving(true);

                                try {

                                    await onSave(form);

                                } finally {

                                    setSaving(false);

                                }

                            }}
                        className="rounded-[10px] bg-navy px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-royal disabled:opacity-50 active:translate-y-px"
                    >

                        {saving ? "Saving..." : "Save Borrower"}

                    </button>

                </div>

            </div>

        </div>

    );
}

function Field({ label, children }) {
    return (
        <label className="block">

            <span className="mb-1.5 block text-xs font-medium text-muted">

                {label}

            </span>

            {children}

        </label>
    );
}