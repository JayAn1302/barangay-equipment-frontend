import { useEffect, useState } from "react";

export default function UserModal({
    open,
    user,
    onClose,
    onSave
}) {

    const [form, setForm] = useState({
        fullName: "",
        username: "",
        password: "",
        role: "Staff",
        isActive: true
    });

    useEffect(() => {

        if (user) {

            setForm({
                fullName: user.fullName,
                username: user.username,
                password: "",
                role: user.role,
                isActive: user.isActive
            });

        }

        else {

            setForm({
                fullName: "",
                username: "",
                password: "",
                role: "Staff",
                isActive: true
            });

        }

    }, [user]);

    if (!open) return null;

    function handleChange(e) {

        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSave(form);

    }

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl w-full max-w-lg p-8">

                <h2 className="text-2xl font-bold mb-6">

                    {user ? "Edit User" : "New User"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                    />

                    <input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder={
                            user
                                ? "Leave blank to keep current password"
                                : "Password"
                        }
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3"
                        required={!user}
                    />

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3"
                    >
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                    </select>

                    {user && (

                        <label className="flex items-center gap-2">

                            <input
                                type="checkbox"
                                name="isActive"
                                checked={form.isActive}
                                onChange={handleChange}
                            />

                            Active

                        </label>

                    )}

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl bg-slate-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-blue-600 text-white"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}