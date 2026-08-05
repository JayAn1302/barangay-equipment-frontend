import { useEffect, useState } from "react";
import { getBorrowings } from "../services/borrowingService";

import ReturnHeader from "../components/Returns/ReturnHeader";
import ReturnStats from "../components/Returns/ReturnStats";
import ReturnSearch from "../components/Returns/ReturnSearch";
import ReturnTable from "../components/Returns/ReturnTable";

export default function Returns() {

    const [returns, setReturns] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadReturns();
    }, []);

    async function loadReturns() {

        try {

            const data = await getBorrowings();

            setReturns(
                data.filter(item => item.status === "Returned")
            );

        }

        catch (error) {

            console.log(error);

        }

    }

    const filteredReturns = returns.filter(item => {

        const keyword = search.toLowerCase();

        return (

            item.borrowerName.toLowerCase().includes(keyword) ||

            item.items?.some(i =>
                i.equipmentName.toLowerCase().includes(keyword)
            ) ||

            `RTN-${String(item.id).padStart(4, "0")}`
                .toLowerCase()
                .includes(keyword)

        );

    });

    return (

        <div className="space-y-6">

            <ReturnHeader />

            <ReturnStats returns={filteredReturns} />

            <ReturnSearch
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ReturnTable
                returns={filteredReturns}
            />

        </div>

    );

}