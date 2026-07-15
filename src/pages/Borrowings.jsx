import { useEffect, useState, useContext } from "react";

import {
    getBorrowings,
    createBorrowing,
    returnBorrowing
} from "../services/borrowingService";

import ReturnEquipmentModal from "../components/Borrowings/ReturnEquipmentModal";

import { getBorrowers } from "../services/borrowerService";
import { getEquipments } from "../services/equipmentService";

import BorrowingModal from "../components/Borrowings/BorrowingModal";

import toast from "react-hot-toast";

import BorrowingHeader from "../components/Borrowings/BorrowingHeader";
import BorrowingSearch from "../components/Borrowings/BorrowingSearch";
import BorrowingTable from "../components/Borrowings/BorrowingTable";
import { SearchContext } from "../context/SearchContext";

export default function Borrowings() {

    const [borrowings, setBorrowings] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [returnModal, setReturnModal] = useState(false);
    const [selectedBorrowing, setSelectedBorrowing] = useState(null);
    const [borrowers, setBorrowers] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const { search } = useContext(SearchContext);

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

async function handleSave(data) {

    try {

        await createBorrowing(data);

        toast.success("Borrowing created successfully!");

        setOpenModal(false);

        loadBorrowings();

    }

    catch (error) {

        console.log(error);

        toast.error(
            error.response?.data ||
            "Failed to create borrowing."
        );

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

    const filteredBorrowings = borrowings.filter(item =>

        item.borrowerName.toLowerCase().includes(search.toLowerCase()) ||

        item.equipmentName.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="space-y-6">

            <BorrowingHeader
                onAdd={() => setOpenModal(true)}
            />

            <BorrowingSearch
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <BorrowingTable
                borrowings={filteredBorrowings}
                onReturn={(item) => {

                    setSelectedBorrowing(item);

                    setReturnModal(true);

                }}
            />

            <BorrowingModal

                open={openModal}

                onClose={() => setOpenModal(false)}

                onSave={handleSave}

                borrowers={borrowers}

                equipments={equipments}

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