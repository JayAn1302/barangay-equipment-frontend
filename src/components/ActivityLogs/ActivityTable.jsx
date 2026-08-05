export default function ActivityTable({ logs }) {

    if (logs.length === 0) {
        return (
            <div className="rounded-3xl border border-line bg-surface py-20 text-center">
                No activity logs found.
            </div>
        );
    }

    return (

        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">

            <table className="w-full">

                <thead className="bg-ground">

                    <tr>

                        <th className="px-6 py-4 text-left">Date & Time</th>
                        <th className="px-6 py-4 text-left">User</th>
                        <th className="px-6 py-4 text-left">Role</th>
                        <th className="px-6 py-4 text-left">Module</th>
                        <th className="px-6 py-4 text-left">Activity</th>

                    </tr>

                </thead>

                <tbody>

                    {logs.map(log => (

                        <tr
                            key={log.activityLogId}
                            className="border-t hover:bg-ground"
                        >

                            <td className="px-6 py-4">
                                {new Date(log.createdAt).toLocaleString()}
                            </td>

                            <td className="px-6 py-4 font-medium">
                                {log.fullName}
                            </td>

                            <td className="px-6 py-4">
                                {log.role}
                            </td>

                            <td className="px-6 py-4">
                                {log.module}
                            </td>

                            <td className="px-6 py-4">
                                {log.action}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}