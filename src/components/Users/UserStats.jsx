import UserHeader from "../components/Users/UserHeader";
import UserStats from "../components/Users/UserStats";
import UserSearch from "../components/Users/UserSearch";
import UserTable from "../components/Users/UserTable";
import UserModal from "../components/Users/UserModal";
import StatusModal from "../components/Users/StatusModal";

const totalUsers = users.length;

const totalAdmins = users.filter(
    user => user.role === "Admin"
).length;

const totalStaff = users.filter(
    user => user.role === "Staff"
).length;

const activeUsers = users.filter(
    user => user.status === "Active"
).length;