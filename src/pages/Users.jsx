import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

import {
    getUsers,
    createUser,
    updateUser,
    toggleUserStatus
} from "../services/userService";

import UserHeader from "../components/Users/UserHeader";
import UserSearch from "../components/Users/UserSearch";
import UserTable from "../components/Users/UserTable";
import UserModal from "../components/Users/UserModal";
import StatusModal from "../components/Users/StatusModal";
import { SearchContext } from "../context/SearchContext";

export default function Users() {

    const [users, setUsers] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const [statusModal, setStatusModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const { search } = useContext(SearchContext);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {

        try {

            const data = await getUsers();

            setUsers(data);

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to load users.");

        }

    }

    async function handleSave(data) {

        try {

            if (selectedUser) {

                await updateUser(selectedUser.id, data);

                toast.success("User updated successfully.");

            }

            else {

                await createUser(data);

                toast.success("User added successfully.");

            }

            setOpenModal(false);

            setSelectedUser(null);

            loadUsers();

        }

        catch (error) {

            console.log(error);

            toast.error(error.response?.data || "Failed to save user.");

        }

    }

    async function handleToggleStatus() {

        try {

            await toggleUserStatus(selectedUser.id);

            toast.success("User status updated.");

            setStatusModal(false);

            setSelectedUser(null);

            loadUsers();

        }

        catch (error) {

            console.log(error);

            toast.error(error.response?.data || "Operation failed.");

        }

    }

    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="space-y-6">

            <UserHeader
                onAdd={() => {

                    setSelectedUser(null);

                    setOpenModal(true);

                }}
            />

            <UserSearch
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <UserTable

                users={filteredUsers}

                onEdit={(user) => {

                    setSelectedUser(user);

                    setOpenModal(true);

                }}

                onToggleStatus={(user) => {

                    setSelectedUser(user);

                    setStatusModal(true);

                }}

            />

            <UserModal

                open={openModal}

                user={selectedUser}

                onClose={() => {

                    setOpenModal(false);

                    setSelectedUser(null);

                }}

                onSave={handleSave}

            />

            <StatusModal

                open={statusModal}

                user={selectedUser}

                onClose={() => {

                    setStatusModal(false);

                    setSelectedUser(null);

                }}

                onConfirm={handleToggleStatus}

            />

        </div>

    );

}