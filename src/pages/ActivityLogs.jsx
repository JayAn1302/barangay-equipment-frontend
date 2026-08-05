import { useEffect, useState } from "react";

import { getActivityLogs } from "../services/activityLogService";

import ActivityHeader from "../components/ActivityLogs/ActivityHeader";
import ActivitySearch from "../components/ActivityLogs/ActivitySearch";
import ActivityTable from "../components/ActivityLogs/ActivityTable";

export default function ActivityLogs() {

    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadLogs();
    }, []);

    async function loadLogs() {

        try {

            const data = await getActivityLogs();

            setLogs(data);

        } catch (error) {

            console.error(error);

        }

    }

    const filteredLogs = logs.filter(log =>

        log.fullName.toLowerCase().includes(search.toLowerCase()) ||

        log.role.toLowerCase().includes(search.toLowerCase()) ||

        log.module.toLowerCase().includes(search.toLowerCase()) ||

        log.action.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="space-y-6">

            <ActivityHeader />

            <ActivitySearch

                value={search}

                onChange={(e) => setSearch(e.target.value)}

            />

            <ActivityTable

                logs={filteredLogs}

            />

        </div>

    );

}