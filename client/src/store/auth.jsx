import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [services, setServices] = useState("");
    const authorizationToken = `Bearer ${token}`;
    // Function to check if the user is logged in or not
    const isLoggedIn = !!token;
    console.log("isLoggedIN ", isLoggedIn);

    //function to stored the token in local storage
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    //adding logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem('token');
    };

    // JWT AUTHENTICATION - to get the currently loggedIN user data

    const userAuthentication = async () => {
        try {
            // setIsLoading(true);
            const response = await fetch("http://localhost:4000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("user data ", data.userData
                );
                setUser(data.userData
                );
                // setIsLoading(false);
            } else {
                console.error("Error fetching user data");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching user data");
        }
    };

    // to fetch the services data from the database
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/data/services", {
                method: "GET",
            });
            console.log("geting response is :", response);
            if (response.ok) {
                const data = await response.json();
                console.log(data.response);
                setServices(data.response);

            }
        } catch (error) {
            console.log(`services frontend error: ${error}`);
        }
    };

    useEffect(() => {
        getServices();
        userAuthentication();
    }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
      throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
  };