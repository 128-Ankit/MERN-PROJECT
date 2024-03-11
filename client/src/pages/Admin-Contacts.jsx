import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';


export const AdminContacts = () => {
    const [contactData, setContactData] = useState([])
    const { authorizationToken } = useAuth();
    const getContactsData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                },
            });
            console.log("response: ", response);
            const data = await response.json();
            console.log("contact data from the response: ", data);

            if (response.ok) {
                setContactData(data.count);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // defining the funciton deleteContactById

    const deleteContactById = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:4000/api/admin/contacts/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: authorizationToken,
                    },
                }
            );
            if (response.ok) {
                getContactsData();
                toast.success("deleted successfully");
            } else {
                toast.error("Not Deleted ");
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getContactsData();
    }, []);

    return <>
        <section className="admin-contacts-section">
            <h1>Admin Contact Data </h1>

            <div className="container  admin-users contact-user-data">
                {contactData.map((curContactData, index) => {
                    const { name, email, message, _id } = curContactData;

                    return (
                        <div key={index}>
                            <p>{name}</p>
                            <p>{email}</p>
                            <p>{message}</p>
                            <button className="btn" onClick={() => deleteContactById(_id)}>
                                Delete
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    </>
}