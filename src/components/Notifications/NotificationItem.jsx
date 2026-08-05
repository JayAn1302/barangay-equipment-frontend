import {
    Bell,
    Package,
    RotateCcw,
    AlertTriangle,
    UserCog,
    Clock,
} from "lucide-react";

const icons = {
    Borrowing: {
        icon: Package,
        bg: "bg-blue-100",
        color: "text-blue-700",
    },
    Return: {
        icon: RotateCcw,
        bg: "bg-green-100",
        color: "text-green-700",
    },
    Overdue: {
        icon: AlertTriangle,
        bg: "bg-red-100",
        color: "text-red-700",
    },
    User: {
        icon: UserCog,
        bg: "bg-yellow-100",
        color: "text-yellow-700",
    },
    Default: {
        icon: Bell,
        bg: "bg-slate-100",
        color: "text-slate-700",
    },
};

export default function NotificationItem({

    notification,

    onRead

}) {
    function handleClick() {

    if (!notification.isRead) {

        onRead(notification.notificationId);

    }

}

    const type = icons[notification.type] || icons.Default;

    const Icon = type.icon;

    return (

        <div
    onClick={handleClick}
    className="cursor-pointer rounded-2xl border border-line bg-surface p-5 transition-all duration-200 hover:border-royal/20 hover:shadow-sm"
>

            <div className="flex items-start gap-4">

                <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${type.bg}`}
                >
                    <Icon
                        className={`h-5 w-5 ${type.color}`}
                    />
                </div>

                <div className="flex-1">

                    <div className="flex items-center justify-between">

                        <h3 className="font-semibold text-navy">

                            {notification.title}

                        </h3>

                        {notification.isRead === false && (

                            <span className="h-2.5 w-2.5 rounded-full bg-royal" />

                        )}

                    </div>

                    <p className="mt-1 text-sm text-muted">

                        {notification.message}

                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-muted">

                    <Clock className="h-3.5 w-3.5" />

                    {new Date(notification.createdAt).toLocaleString("en-PH", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                    })}

                </div>

                </div>

            </div>

        </div>

    );

}