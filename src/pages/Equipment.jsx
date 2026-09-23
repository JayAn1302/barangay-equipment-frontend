import { useEffect, useState, useContext } from "react";
import {
    getEquipments,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    incrementEquipment
} from "../services/equipmentService";
import EquipmentModal from "../components/Equipment/EquipmentModal";
import EquipmentHeader from "../components/Equipment/EquipmentHeader";
import EquipmentSearch from "../components/Equipment/EquipmentSearch";
import EquipmentTable from "../components/Equipment/EquipmentTable";
import DeleteEquipmentModal from "../components/Equipment/DeleteEquipmentModal";
import MergeEquipmentModal from "../components/Equipment/MergeEquipmentModal";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { getRole } from "../utils/tokenStorage";



export default function Equipment() {

    const [equipments, setEquipments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [mergeModal, setMergeModal] = useState(false);
    const [mergeTarget, setMergeTarget] = useState(null);
    const [pendingQuantity, setPendingQuantity] = useState(0);
    const [searchParams] = useSearchParams();
    const selectedId = searchParams.get("id");
    const [search, setSearch] = useState("");
    const role = getRole();

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

        if (error.response?.status === 409) {

            setMergeTarget(error.response.data);
            setPendingQuantity(data.quantity);
            setOpenModal(false);
            setMergeModal(true);

        } else {

            toast.error(getErrorMessage(error, "Unable to save equipment."));

        }

    }

}

            async function handleConfirmMerge() {

                try {

                    await incrementEquipment(mergeTarget.existingId, pendingQuantity);

                    toast.success("Quantity added to existing equipment!");

                    setMergeModal(false);
                    setMergeTarget(null);
                    setPendingQuantity(0);
                    setSelectedEquipment(null);

                    loadEquipments();

                }

                catch (error) {

                    toast.error(getErrorMessage(error, "Unable to update quantity."));

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

                        toast.error(getErrorMessage(error, "Failed to delete equipment."));

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
                existingEquipments={equipments}
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

<MergeEquipmentModal
    open={mergeModal}
    existing={mergeTarget}
    addQuantity={pendingQuantity}
    onClose={() => {
        setMergeModal(false);
        setMergeTarget(null);
        setPendingQuantity(0);
    }}
    onConfirm={handleConfirmMerge}
/>

        </div>

        );

}

function getErrorMessage(error, fallback) {
    const data = error.response?.data;

    if (!data) return fallback;
    if (typeof data === "string") return data;
    if (data.message) return data.message;
    if (data.title) return data.title;

    if (data.errors) {
        const firstField = Object.values(data.errors)[0];
        if (Array.isArray(firstField) && firstField.length > 0) {
            return firstField[0];
        }
    }

    return fallback;
}
