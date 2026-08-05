import { X, UserCog } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserModal({
    open,
    user,
    onClose,
    onSave,
}) {
    const [form, setForm] = useState({
        fullName: "",
        username: "",
        password: "",
        role: "Staff",
        isActive: true,
    });

    useEffect(() => {
        if (open) {
            if (user) {
                setForm({
                    fullName: user.fullName,
                    username: user.username,
                    password: "",
                    role: user.role,
                    isActive: user.isActive,
                });
            } else {
                setForm({
                    fullName: "",
                    username: "",
                    password: "",
                    role: "Staff",
                    isActive: true,
                });
            }
        }
    }, [open, user]);

    if (!open) return null;

    const inputCls =
        "w-full rounded-[10px] border border-line bg-ground px-3 py-2.5 text-sm outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/15 placeholder:text-muted/70";

    function handleChange(e) {
        const { name, value, checked, type } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(form);
    }

    return (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">

            <div
                className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="animate-modal relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">

                {/* Header */}

                <div className="flex items-start justify-between border-b border-line px-6 py-4">

                    <div className="flex items-start gap-3">

                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gold/12 text-goldink">

                            <UserCog className="h-5 w-5" />

                        </div>

                        <div>

                            <h2 className="font-serif text-lg font-semibold">

                                {user ? "Edit User" : "Add User"}

                            </h2>

                            <p className="text-xs text-muted">

                                Manage system user information.

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

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 px-6 py-5"
                >

                    <Field label="Full Name">

                        <input
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            className={inputCls}
                            placeholder="Enter full name"
                            required
                        />

                    </Field>

                    <Field label="Username">

                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className={inputCls}
                            placeholder="Enter username"
                            required
                        />

                    </Field>

                    <Field label="Password">

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className={inputCls}
                            placeholder={
                                user
                                    ? "Leave blank to keep current password"
                                    : "Enter password"
                            }
                            required={!user}
                        />

                    </Field>

                    <div className="grid grid-cols-2 gap-4">

                        <Field label="Role">

                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className={`${inputCls} appearance-none`}
                            >
                                <option value="Admin">Administrator</option>
                                <option value="Staff">Staff</option>
                            </select>

                        </Field>

                        {user && (

                            <Field label="Status">

                                <select
                                    name="isActive"
                                    value={form.isActive ? "true" : "false"}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            isActive: e.target.value === "true",
                                        })
                                    }
                                    className={`${inputCls} appearance-none`}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>

                            </Field>

                        )}

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end gap-3 border-t border-line pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-[10px] border border-line bg-surface px-4 py-2 text-sm font-semibold transition hover:border-muted/40 hover:bg-ground"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-[10px] bg-navy px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-royal active:translate-y-px"
                        >
                            {user ? "Save Changes" : "Save User"}
                        </button>

                    </div>

                </form>

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