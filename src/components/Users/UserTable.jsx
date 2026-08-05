import { Pencil, RefreshCw, User } from "lucide-react";

export default function UserTable({
    users,
    onEdit,
    onToggleStatus,
}) {
    return (
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">

            <table className="w-full">

                <thead className="border-b border-line bg-surface">

                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted">

                        <th className="px-7 py-5">User</th>
                        <th className="px-7 py-5">Username</th>
                        <th className="px-7 py-5">Role</th>
                        <th className="px-7 py-5">Status</th>
                        <th className="px-7 py-5 text-center">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {users.length > 0 ? (

                        users.map((user) => (

                            <tr
                                key={user.id}
                                className="border-b border-line last:border-0 hover:bg-ground transition"
                            >

                                {/* User */}

                                <td className="px-7 py-5">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">

                                            <User
                                                size={20}
                                                className="text-slate-500"
                                            />

                                        </div>

                                        <div>

                                            <p className="font-semibold text-navy">
                                                {user.fullName}
                                            </p>

                                            <p className="text-sm text-muted">
                                                @{user.username}
                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* Username */}

                                <td className="px-7 py-5 font-medium text-muted">
                                    @{user.username}
                                </td>

                                {/* Role */}

                                <td className="px-7 py-5">

                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
                                            ${
                                                user.role === "Admin"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-purple-100 text-purple-700"
                                            }`}
                                    >
                                        {user.role}
                                    </span>

                                </td>

                                {/* Status */}

                                <td className="px-7 py-5">

                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
                                            ${
                                                user.isActive
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        ● {user.isActive ? "Active" : "Inactive"}
                                    </span>

                                </td>

                                {/* Action */}

                                <td className="px-7 py-5">

                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() => onEdit(user)}
                                            className="rounded-lg p-2 text-slate-500 transition hover:bg-ground hover:text-navy"
                                            title="Edit User"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() => onToggleStatus(user)}
                                            className="rounded-lg p-2 text-slate-500 transition hover:bg-ground hover:text-orange-600"
                                            title={
                                                user.isActive
                                                    ? "Deactivate User"
                                                    : "Activate User"
                                            }
                                        >
                                            <RefreshCw size={18} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={5}
                                className="py-14 text-center text-muted"
                            >

                                No users found.

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}