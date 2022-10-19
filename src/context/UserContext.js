import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore"
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

        const getData = async () => {
            const box = []
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => box.push({ id: doc.id, data: doc.data() }));
            setUserData(box)
        }
        return () => {
            unsub()
            getData()
        }
    }, []);


    return <UserContextApi.Provider value={{ currentUser, userData }}>{children}</UserContextApi.Provider>
}