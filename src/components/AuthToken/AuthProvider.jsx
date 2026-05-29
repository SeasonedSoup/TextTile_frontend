import { useState } from "react";
import { AuthContext } from "./AuthContext";
import getApiUrl from "../../utils/getApiUrl";
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    
    async function verifyAuth() {

        //first part
        const token = localStorage.getItem("token");

        if(!token) {
            setUserLoading(false);
            console.log("no token found");
            return;
        }

        //second part verify token
        const url = getApiUrl() + `/api/`
        try {
            const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            });

            if (!response.ok) {
                throw new Error(response.status);
            }

            const result = await response.json();

            setUser(result);
        } catch (err) {
            console.error(err);
        } finally {
            setUserLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser, userLoading, verifyAuth}}>
            {children}
        </AuthContext.Provider>
    )
}