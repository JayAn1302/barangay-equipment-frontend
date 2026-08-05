import { useEffect, useState, useContext } from "react";

import {
    getBorrowings,
    createBorrowing,
    returnBorrowing,
     deleteBorrowing
} from "../services/borrowingService";

import ReturnEquipmentModal from "../components/Borrowings/ReturnEquipmentModal";

import { getBorrowers } from "../services/borrowerService";
import { getEquipments } from "../services/equipmentService";

import BorrowingModal from "../components/Borrowings/BorrowingModal";

import toast from "react-hot-toast";

import BorrowingHeader from "../components/Borrowings/BorrowingHeader";
import BorrowingSearch from "../components/Borrowings/BorrowingSearch";
import BorrowingTable from "../components/Borrowings/BorrowingTable";
import BorrowingStats from "../components/Borrowings/BorrowingStats";


export default function Borrowings() {

    const [borrowings, setBorrowings] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [returnModal, setReturnModal] = useState(false);
    const [selectedBorrowing, setSelectedBorrowing] = useState(null);
    const [borrowers, setBorrowers] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {

    loadBorrowings();

    loadBorrowers();

    loadEquipments();

}, []);

    async function loadBorrowings() {

        try {

            const data = await getBorrowings();

            setBorrowings(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function loadBorrowers() {

    try {

        const data = await getBorrowers();

        setBorrowers(data);

    }

    catch (error) {

        console.log(error);

    }

}

async function loadEquipments() {

    try {

        const data = await getEquipments();

        setEquipments(data);

    }

    catch (error) {

        console.log(error);

    }

}

const [saving, setSaving] = useState(false);

async function handleSave(data) {

    if (saving) return;

    setSaving(true);

    try {

        await createBorrowing(data);

        toast.success("Borrowing created successfully!");

        setOpenModal(false);

        loadBorrowings();

    }
    catch (error) {

        toast.error(error.response?.data || "Failed to save borrowing.");

    }
    finally {

        setSaving(false);

    }
}

async function handleReturn(data) {

    try {

        await returnBorrowing(selectedBorrowing.id, data);

        toast.success("Equipment returned successfully!");

        setReturnModal(false);

        setSelectedBorrowing(null);

        loadBorrowings();

        // Refresh equipment list for future borrowings
        loadEquipments();

    }

    catch (error) {

        console.log(error);

        toast.error(
            error.response?.data ||
            "Failed to return equipment."
        );

    }

}

async function handleDelete(id) {

    if (!window.confirm("Delete this borrowing record?")) return;

    try {

        await deleteBorrowing(id);

        toast.success("Borrowing deleted successfully!");

        loadBorrowings();

    }
    catch (error) {

        toast.error(
            error.response?.data ||
            "Failed to delete borrowing."
        );

    }

}

    const filteredBorrowings = borrowings.filter(item => {

    const keyword = search.toLowerCase();

    const matchesSearch =
    item.borrowerName.toLowerCase().includes(keyword) ||

    item.items?.some(i =>
        i.equipmentName.toLowerCase().includes(keyword)
    ) ||

    item.referenceNo
        .toLowerCase()
        .includes(keyword) ||

    item.status.toLowerCase().includes(keyword);

    const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

    return matchesSearch && matchesStatus;

});

    return (

        <div className="space-y-7">

            <BorrowingHeader
                onAdd={() => setOpenModal(true)}
            />

            <BorrowingStats
                borrowings={filteredBorrowings}
            />

            <BorrowingSearch
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                status={statusFilter}
                onStatusChange={(e) => setStatusFilter(e.target.value)}
            />

            <BorrowingTable
                borrowings={filteredBorrowings}
                onReturn={(item) => {

                    setSelectedBorrowing(item);

                    setReturnModal(true);

                }}
                onDelete={handleDelete}
            />

            <BorrowingModal

                open={openModal}

                onClose={() => setOpenModal(false)}

                onSave={handleSave}

                borrowers={borrowers}

                equipments={equipments}

                saving={saving}

            />

            <ReturnEquipmentModal

                open={returnModal}

                borrowing={selectedBorrowing}

                onClose={() => {

                    setReturnModal(false);

                    setSelectedBorrowing(null);

                }}

                onSave={handleReturn}

            />

        </div>

    );

}