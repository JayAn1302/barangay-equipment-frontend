import { useEffect, useState } from "react";

import NotificationHeader from "../components/Notifications/NotificationHeader";
import NotificationList from "../components/Notifications/NotificationList";

import {
    getNotifications,
    markAsRead
} from "../services/notificationService";

import toast from "react-hot-toast";

export default function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        loadNotifications();

    }, []);

    async function loadNotifications() {

        try {

            const data = await getNotifications();

            setNotifications(data);

        }

        catch {

            toast.error("Failed to load notifications.");

        }

    }

    async function handleRead(id) {

        try {

            await markAsRead(id);

            loadNotifications();

        }

        catch {

            toast.error("Unable to mark notification.");

        }

    }

    return (

        <div className="space-y-6">

            <NotificationHeader />

            <NotificationList

                notifications={notifications}

                onRead={handleRead}

            />

        </div>

    );

}