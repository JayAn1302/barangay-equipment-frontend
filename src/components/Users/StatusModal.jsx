export default function StatusModal({
    open,
    user,
    onClose,
    onConfirm
}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-full max-w-md">

                <h2 className="text-xl font-bold">

                    {user?.isActive
                        ? "Deactivate User"
                        : "Activate User"}
                </h2>

                <p className="mt-4 text-slate-600">

                    Are you sure you want to

                    <strong>
                        {user?.isActive
                            ? " deactivate "
                            : " activate "}
                    </strong>

                    <strong>{user?.fullName}</strong>?

                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl bg-slate-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-xl bg-blue-600 text-white"
                    >
                        Confirm
                    </button>

                </div>

            </div>

        </div>

    );

}