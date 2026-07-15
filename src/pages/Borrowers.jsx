import { useEffect, useState, useContext } from "react";
import {
    getBorrowers,
    createBorrower,
    updateBorrower,
    deleteBorrower
} from "../services/borrowerService";
import BorrowerModal from "../components/Borrowers/BorrowerModal";
import toast from "react-hot-toast";
import { SearchContext } from "../context/SearchContext";
import BorrowerHeader from "../components/Borrowers/BorrowerHeader";
import BorrowerSearch from "../components/Borrowers/BorrowerSearch";
import BorrowerTable from "../components/Borrowers/BorrowerTable";
import DeleteBorrowerModal from "../components/Borrowers/DeleteBorrowerModal";

export default function Borrowers() {

    const [borrowers, setBorrowers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedBorrower, setSelectedBorrower] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const { search } = useContext(SearchContext);

    useEffect(() => {

        loadBorrowers();

    }, []);

    async function loadBorrowers() {

        try {

            const data = await getBorrowers();

            setBorrowers(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function handleSave(data) {

    try {

        if (selectedBorrower) {

            await updateBorrower(selectedBorrower.id, data);

            toast.success("Borrower updated successfully!");

        }

        else {

            await createBorrower(data);

            toast.success("Borrower added successfully!");

        }

        setOpenModal(false);

        setSelectedBorrower(null);

        loadBorrowers();

    }

    catch (error) {

        console.log(error);

        toast.error("Failed to save borrower.");

    }

}

async function handleDelete(id) {

    try {

        await deleteBorrower(id);

        toast.success("Borrower deleted successfully!");

        setDeleteModal(false);

        setDeleteItem(null);

        loadBorrowers();

    }

    catch (error) {

        console.log(error);

        toast.error(
            error.response?.data ||
            "Failed to delete borrower."
        );

    }

}

    const filteredBorrowers = borrowers.filter(item =>
        item.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="space-y-6">

            <BorrowerHeader
                onAdd={() => setOpenModal(true)}
            />

            <BorrowerSearch
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <BorrowerTable
                borrowers={filteredBorrowers}
                onEdit={(item) => {

                    setSelectedBorrower(item);

                    setOpenModal(true);

                }}
               onDelete={(item) => {

                    setDeleteItem(item);

                    setDeleteModal(true);

                }}
            />

            <BorrowerModal

                open={openModal}

                borrower={selectedBorrower}

                onClose={() => {

                    setOpenModal(false);

                    setSelectedBorrower(null);

                }}

                onSave={handleSave}

            />

            <DeleteBorrowerModal

    open={deleteModal}

    borrower={deleteItem}

    onClose={() => {

        setDeleteModal(false);

        setDeleteItem(null);

    }}

    onDelete={handleDelete}

/>

        </div>

    );

}