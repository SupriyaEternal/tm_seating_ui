import { useEffect, useState } from "react";
import UserModal from "../../components/forms/UserModal";
import { FiSearch } from "react-icons/fi";
import type { UserType, NewUser } from "../../types/user";
import Loader from "../../components/common/Loader";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  resetPassword,
} from "../../services/api/userService.ts";


type Mode = "add" | "edit" | "reset";


const UserManagementScreen = () => {

    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const [mode, setMode] = useState<Mode>("add");

    const [selectedUser, setSelectedUser] =useState<UserType | null>(null);


    const loadUsers = async () => {
        try {
        setLoading(true);

        const res = await getUsers();

        setUsers(res.data || []);
        } catch (err) {
        console.error("Load users error:", err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);


    const filtered = users?.filter((u) =>
        `${u.user_name} ${u.user_email} ${u.user_access}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );


    const openAdd = () => {
        setMode("add");
        setSelectedUser(null);
        setModalOpen(true);
    };

    const openEdit = (u: UserType) => {
        setMode("edit");
        setSelectedUser(u);
        setModalOpen(true);
    };

    const openReset = (u: UserType) => {
        setMode("reset");
        setSelectedUser(u);
        setModalOpen(true);
    };


    const handleSubmit = async (data: NewUser[],mode: Mode) => {
        try {

        /* ADD MULTIPLE */
        if (mode === "add") {
            await Promise.all(data.map(addUser));
        }

        /* EDIT */
        if (mode === "edit" && selectedUser) {
            await updateUser(selectedUser.user_id, data[0]);
        }

        /* RESET */
        if (mode === "reset") {
            await resetPassword({
            user_email: data[0].user_email,
            user_password: data[0].user_password,
            });
        }

        await loadUsers();
        setModalOpen(false);

        } 
        
        catch (err) {
        console.error("Submit error:", err);
        alert("Operation failed");
        }
    };

    const handleDelete = async (email?: string) => {
        if (!email) return;

        if (!confirm("Delete user?")) return;

        try {
            await deleteUser(email);
            loadUsers();
        } 
        
        catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (

        <>

            <div className="min-h-screen bg-gray-100 p-6">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-2xl font-bold text-gray-800">User Management</h1>

                    <button
                        onClick={openAdd}
                        className="px-4 py-2 bg-[#2b4d94] text-white rounded-lg hover:bg-[#1c315e] cursor-pointer transition-colors font-medium"
                        >
                        + Add User
                    </button>

                </div>

                <div className="mb-5">

                    <div className="relative w-full max-w-sm">

                        <input
                            type="text"
                            placeholder="Search by name, email, role..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                            w-full pl-10 pr-3 py-2
                             rounded-lg border border-gray-300
                            outline-none
                            "
                        />

                        <FiSearch
                            className="
                            absolute left-3 top-1/2
                            -translate-y-1/2
                            text-gray-400
                            text-lg
                            "
                        />

                        

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow overflow-x-auto">

                    <table className="w-full text-sm">

                    <thead className="bg-gray-100 text-gray-700">

                        <tr>
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Role</th>
                        <th className="p-3 text-center">Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {loading && (
                        <tr>
                            <td colSpan={5}>
                            <Loader />
                            </td>
                        </tr>
                        )}

                        {!loading &&
                        filtered.map((u) => (
                            <tr
                            key={u.user_id}
                            className="border-t hover:bg-gray-50"
                            >

                            <td className="p-3">{u.user_id}</td>

                            <td className="p-3">{u.user_name}</td>

                            <td className="p-3">{u.user_email}</td>

                            <td className="p-3 text-blue-600 font-medium">
                                {u.user_access}
                            </td>

                            <td className="p-3">

                                <div className="flex justify-center gap-3">

                                <button
                                    onClick={() => openEdit(u)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => openReset(u)}
                                    className="text-yellow-600 hover:underline"
                                >
                                    Reset
                                </button>

                                <button
                                    onClick={() =>
                                    handleDelete(u.user_email)
                                    }
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>

                                </div>

                            </td>

                            </tr>
                        ))}

                        {!loading && filtered.length === 0 && (
                        <tr>
                            <td
                            colSpan={5}
                            className="p-6 text-center text-gray-400"
                            >
                            No users found
                            </td>
                        </tr>
                        )}

                    </tbody>

                    </table>

                </div>



            </div>
        
            <UserModal
                open={modalOpen}
                mode={mode}
                user={selectedUser}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default UserManagementScreen;
