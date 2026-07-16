import { useEffect, useState, useContext } from "react";
import {
    getEquipments,
    createEquipment,
    updateEquipment,
    deleteEquipment
} from "../services/equipmentService";
import EquipmentModal from "../components/Equipment/EquipmentModal";
import EquipmentHeader from "../components/Equipment/EquipmentHeader";
import EquipmentSearch from "../components/Equipment/EquipmentSearch";
import EquipmentTable from "../components/Equipment/EquipmentTable";
import DeleteEquipmentModal from "../components/Equipment/DeleteEquipmentModal";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function Equipment() {

    const [equipments, setEquipments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const role = localStorage.getItem("role");
    const [searchParams] = useSearchParams();
    const selectedId = searchParams.get("id");
    const [search, setSearch] = useState("");
    

    useEffect(() => {
        loadEquipments();
    }, []);

    async function loadEquipments() {

        try {

            const data = await getEquipments();

            setEquipments(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {

    if (!selectedId) return;

    const equipment = equipments.find(
        e => e.id === Number(selectedId)
    );

    if (equipment) {

        console.log(equipment);

        // Later we'll automatically open the Edit/View modal here.

    }

}, [equipments, selectedId]);

    async function handleSave(data) {

    try {

        if (selectedEquipment) {

           await updateEquipment(selectedEquipment.id, data);

            toast.success("Equipment updated successfully!");

        } else {

            await createEquipment(data);

            toast.success("Equipment added successfully!");

        }

        setOpenModal(false);

        setSelectedEquipment(null);

        loadEquipments();

    }

    catch (error) {

        console.log(error);

        toast.error("Failed to save equipment.");

    }

}
async function handleDelete(id) {

    try {

        await deleteEquipment(id);
        toast.success("Equipment deleted successfully!");

        setDeleteModal(false);

        setDeleteItem(null);

        loadEquipments();

    }

    catch (error) {

        console.log(error);

        toast.error(
            error.response?.data ||
            "Failed to delete equipment."
        );

    }

}

    const filteredEquipments = equipments.filter(item =>
        item.equipmentName.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="space-y-6">

            <EquipmentHeader
                onAdd={
                    role === "Admin"
                        ? () => setOpenModal(true)
                        : null
                }
            />

            <EquipmentSearch
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <EquipmentTable
                equipments={filteredEquipments}
                onEdit={(item) => {

                    setSelectedEquipment(item);

                    setOpenModal(true);

                }}
               onDelete={(item) => {

                    setDeleteItem(item);

                    setDeleteModal(true);

                }}
            />

        <EquipmentModal
    open={openModal}
    equipment={selectedEquipment}
    onClose={() => {
        setOpenModal(false);
        setSelectedEquipment(null);
    }}
    onSave={handleSave}
/>
<DeleteEquipmentModal

    open={deleteModal}

    equipment={deleteItem}

    onClose={() => {

        setDeleteModal(false);

        setDeleteItem(null);

    }}

    onDelete={handleDelete}

/>

        </div>

    );

}