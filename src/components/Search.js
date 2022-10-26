import { BsSearch } from "react-icons/bs"
import React, { useContext, useState } from 'react'
import { UserContextApi } from "../context/UserContext"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"


function Search() {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    console.log("user :", user)
    const { currentUser } = useContext(UserContextApi)
    const style = {
        nav_left: "w-[310px] ml-[10px] h-[45px] bg-[#181818] hover:border-[gray] hover:border-[1px] rounded-[30px] flex items-center relative",
        BsSearch: "text-[19px] text-[#6C6C6C] ml-[18px]",
        nav_left_input: "w-[275px] h-[43px]  bg-[#181818] text-[19px] text-[#fff] focus:outline-none indent-[15px] rounded-[30px] ",
    }

    const HundleSearch = async (e) => {
        const userName = e.target.value.toLowerCase()
        const quary = query(collection(db, "users"),
            where("username", "==", userName))
        try {
            const querySnapshot = await getDocs(quary);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (error) {
            setError(true)
        }
    }
    return (
        <div className={style.nav_left}>
            <BsSearch className={style.BsSearch} />
            <input className={style.nav_left_input} type="text" placeholder='Search' onChange={HundleSearch} />

            {user ? <div className="w-[300px] bg-blue-300 absolute top-[50px]">
                <li className="flex  text-[#fff] items-center  px-3 py-2 cursor-pointer  font-mono duration-300">
                    <img className='w-[100px] h-[100px] rounded-full ' src={user.imgLink} alt="" />
                    <div className="w-full">
                        <h2 className='text-[20px] font-bold'>{user.username}</h2>
                    </div>
                </li>
            </div> : ""}
        </div>
    )
}

export default Search