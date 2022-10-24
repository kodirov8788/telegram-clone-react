import React, { useContext, useEffect, useState } from 'react'
import { UserContextApi } from '../context/UserContext'
import { auth, db, storage } from "../firebase/firebaseConfig"
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from "react-router-dom"



function Register() {
    const navigate = useNavigate()
    const { userData, currentUser } = useContext(UserContextApi)
    const [selectedData, setSelectedData] = useState()
    console.log(userData)
    console.log(currentUser)
    console.log(selectedData)

    const stl = {
        form: "w-full h-[100vh] flex flex-col justify-center items-center bg-[#000] relative",
        register: "flex flex-col items-center w-full h-[100vh] bg-[#212121] ",
        img: "w-[170px]  xl:mt-[60px]",
        h1: "text-[65px] text-[#FFFFFF] font-mono my-[30px]  font-semibold",
        p: "my-2 w-[300px] text-center text-[#AAAAAA]",
        input: "input w-[365px] h-[48px]` mt-[20px] outline-none  indent-[14px] font-mono  hover:border-[#6A52DA] border-transparent border-[3px] font-semibold rounded-[30px] text-[#000] text-[20px] p-2 flex flex-col items-center  ",

        btn: "text-[20px] text-[#FFFFFF] mt-[30px] font-sans w-[350px] h-[55px] border-none p-2 bg-[#8774E1] rounded hover:bg-[#6A52DA] duration-300"
    }

    const hundleRegister = async (e) => {
        e.preventDefault()
        const username = e.target[0].value
        const file = e.target[1].value
        console.log(file)
        if (username === "") {
            alert("usernameni kiriting!")
        } else if (file === null || file === "") {
            alert("rasm tanglang!")
        } else {
            const registerUpdate = doc(db, "users", selectedData[0].id);
            try {
                const storageRef = ref(storage, `images/${username}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateProfile(auth.currentUser, {
                                displayName: username,
                                photoURL: downloadURL
                            })
                            await updateDoc(registerUpdate, {
                                username: username,
                                uuid: selectedData[0].id,
                                imgLink: downloadURL
                            });
                            await setDoc(doc(db, "userChats", selectedData[0].id), {});
                            navigate('/')
                        });
                    }
                );
            } catch (error) {
                console.log(error)
            }
        }
        console.log(username)
        console.log(selectedData.id)
    }

    useEffect(() => {

        const isUser = userData.filter(item => item.data.number === currentUser.phoneNumber)
        setSelectedData(isUser)
    }, [userData])


    return (
        <form className={stl.form} onSubmit={hundleRegister}>
            <h1 className={stl.h1}>Login</h1>
            <input className={stl.input} type="text" placeholder="Username" />
            <div className="">
                <input className="mt-[30px]" type="file" />
            </div>
            <button className={stl.btn}>Send OTP</button>
        </ form >
    )
}

export default Register