import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react"
import { auth } from "../firebase/firebaseConfig";
export const UserContextApi = createContext()



export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    console.log(currentUser);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        });
        return () => {
            unsub()
        }
    }, []);


    return <UserContextApi.Provider value={currentUser}>{children}</UserContextApi.Provider>
}