import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore"
import { createContext, useState, useEffect } from "react"
import { auth, db } from "../firebase/firebaseConfig";


export const UserContextApi = createContext()



export const UserContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState()
    const [userData, setUserData] = useState([])
    console.log("currentUser :", currentUser);
    console.log("userData: ", userData)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        });

        const unsubscribe = onSnapshot(
            collection(db, "users"),
            async (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
                return setUserData(data)
            },
            (error) => {
                console.log(error)
            });

        return () => {
            unsub()
            unsubscribe();
        }
    }, []);


    return <UserContextApi.Provider value={{ currentUser, userData }}>{children}</UserContextApi.Provider>
}