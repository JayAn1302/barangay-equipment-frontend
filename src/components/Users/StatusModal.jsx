import { X, ShieldAlert, ShieldCheck } from "lucide-react";

export default function StatusModal({
    open,
    user,
    onClose,
    onConfirm,
}) {
    if (!open) return null;

    const isDeactivate = user?.isActive;

    return (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">

            {/* Backdrop */}

            <div
                className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="animate-modal relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">

                {/* Header */}

                <div className="flex items-start justify-between border-b border-line px-6 py-4">

                    <div className="flex items-start gap-3">

                        <div
                            className={`grid h-10 w-10 place-items-center rounded-lg
                            ${
                                isDeactivate
                                    ? "bg-red-100 text-red-600"
                                    : "bg-green-100 text-green-600"
                            }`}
                        >
                            {isDeactivate ? (
                                <ShieldAlert className="h-5 w-5" />
                            ) : (
                                <ShieldCheck className="h-5 w-5" />
                            )}
                        </div>

                        <div>

                            <h2 className="font-serif text-lg font-semibold">

                                {isDeactivate
                                    ? "Deactivate User"
                                    : "Activate User"}

                            </h2>

                            <p className="text-xs text-muted">

                                Confirm account status update.

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

                <div className="px-6 py-6">

                    <p className="text-sm leading-6 text-muted">

                        Are you sure you want to

                        <span
                            className={`mx-1 font-semibold ${
                                isDeactivate
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                        >
                            {isDeactivate
                                ? "deactivate"
                                : "activate"}
                        </span>

                        the account of

                        <span className="ml-1 font-semibold text-navy">
                            {user?.fullName}
                        </span>

                        ?

                    </p>

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
                        onClick={onConfirm}
                        className={`rounded-[10px] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all active:translate-y-px
                        ${
                            isDeactivate
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {isDeactivate
                            ? "Deactivate"
                            : "Activate"}

                    </button>

                </div>

            </div>

        </div>
    );
}