import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllUserData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            console.log("users", data);

            if (data.success) {
                setUsers(data.data);
            }
            else {
                console.error(data.message);
                // alert("Unable to fetch data: " + data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //deleting user from the database
    const deleteUser = async (id) => {
        try {
            console.log("id is: ", id);
            const response = await fetch(`http://localhost:4000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            console.log("response: ", response);
            const data = await response.json();
            console.log(`user after delete: ${data}`)

            if (response.ok) {
                toast.success("User deleted  successfully");
                getAllUserData();
            } else {
                console.log("Error deleting User :" + data.message);
                toast.error("user not deleted");
            }

        } catch (error) {
            console.log("Error in delation", error);
        }
    }

    useEffect(() => {
        getAllUserData();
    }, []);

    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin Users Data </h1>
                </div>
                <div className="container  admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser, index) => (
                                <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td>
                                        <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteUser(curUser._id)}>{""} Delete{""}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};
