import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();
    // let handle the input field value
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    //handle form on login
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        //connecting login with backend
        try {
            const response = await fetch(`http://localhost:4000/api/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                });
            const data_res = await response.json();
            console.log('response from server: ', data_res);
            if (response.ok) {
                toast.success("Logged in Successfully");
                //storing token in local storage
                storeTokenInLS(data_res.token);
                navigate("/");
            }
            else {
                toast.error("Invalid email or password");
            }
        } catch (error) {
            console.log("Login error", error);
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image reg-img">
                                <img
                                    src="/images/register.png"
                                    alt="a nurse with a cute look"
                                    width="400"
                                    height="500"
                                />
                            </div>

                            {/* our main registration code  */}
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                            placeholder="email"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleInput}
                                            placeholder="password"
                                        />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">
                                        Login Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};