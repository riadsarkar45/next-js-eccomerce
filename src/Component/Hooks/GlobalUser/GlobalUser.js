import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPublic from "../UseAxiosPublic";
import { AuthContext } from "../AuthProvider";

export const LoggedInUser = createContext(null);
const GlobalUser = ({ children }) => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const [isUserLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (!user) return console.log('Something went wrong.');
        axiosPublic.get(`api/getUser/${user?.uid}`)
        .then((res) => {
            console.log(res.data);
        })
        .catch((res) => {
            console.log(res.data);
        })

    }, [user?.uid, axiosPublic])
    const loggedInUserInfo = { isUserLoading };

    return (
        <LoggedInUser.Provider value={loggedInUserInfo}>
            {children}
        </LoggedInUser.Provider>
    );
};

export default GlobalUser;