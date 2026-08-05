import NotificationItem from "./NotificationItem";

export default function NotificationList({

    notifications,

    onRead,

}) {

    if (notifications.length === 0) {

        return (

            <div className="rounded-3xl border border-line bg-surface py-20 text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

                    🔔

                </div>

                <h3 className="mt-6 text-lg font-semibold text-navy">

                    No Notifications

                </h3>

                <p className="mt-2 text-sm text-muted">

                    You're all caught up. New notifications will appear here.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-4">

            {notifications.map((notification) => (

                <NotificationItem
                    key={notification.notificationId}
                    notification={notification}
                    onRead={onRead}
                />

            ))}

        </div>

    );

}