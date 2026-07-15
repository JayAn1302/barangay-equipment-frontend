import { Pencil, RefreshCw } from "lucide-react";

export default function UserTable({
    users,
    onEdit,
    onToggleStatus
}) {

    return (

        <div className="bg-white rounded-3xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr>
                        <th className="px-6 py-4 text-left">Full Name</th>
                        <th className="px-6 py-4 text-left">Username</th>
                        <th className="px-6 py-4 text-left">Role</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-center">Action</th>
                    </tr>

                </thead>

                <tbody>

                    {users.map(user => (

                        <tr
                            key={user.id}
                            className="border-t hover:bg-slate-50"
                        >

                            <td className="px-6 py-4">
                                {user.fullName}
                            </td>

                            <td className="px-6 py-4">
                                {user.username}
                            </td>

                            <td className="px-6 py-4">
                                {user.role}
                            </td>

                            <td className="px-6 py-4">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold
                                    ${
                                        user.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {user.isActive ? "Active" : "Inactive"}
                                </span>

                            </td>

                            <td className="px-6 py-4">

                                <div className="flex justify-center gap-3">

                                    <button
                                        onClick={() => onEdit(user)}
                                    >
                                        <Pencil
                                            size={18}
                                            className="text-blue-600"
                                        />
                                    </button>

                                    <button
                                        onClick={() => onToggleStatus(user)}
                                    >
                                        <RefreshCw
                                            size={18}
                                            className="text-orange-500"
                                        />
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}