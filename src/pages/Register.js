import React from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import "react-phone-number-input/style.css"
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig"
import PhoneInput from 'react-phone-number-input'
import TelegramImg from "../images/telegram.svg"
import { useNavigate } from "react-router-dom"
import { async } from '@firebase/util';
function Register() {
    const [userdata, setUserdata] = useState({
        username: "",
        image: "",

    })
    const stl = {
        form: "w-full h-[100vh] flex flex-col justify-center items-center bg-[#000] relative",
        register: "flex flex-col items-center w-full h-[100vh] bg-[#212121] ",
        img: "w-[170px]  xl:mt-[60px]",
        h1: "text-[65px] text-[#FFFFFF] font-mono my-[30px]  font-semibold",
        p: "my-2 w-[300px] text-center text-[#AAAAAA]",
        input: "input w-[365px] h-[48px]` mt-[20px] outline-none  indent-[14px] font-mono  hover:border-[#6A52DA] border-transparent border-[3px] font-semibold rounded-[30px] text-[#000] text-[20px] p-2 flex flex-col items-center  ",

        btn: "text-[20px] text-[#FFFFFF] mt-[30px] font-sans w-[350px] h-[55px] border-none p-2 bg-[#8774E1] rounded hover:bg-[#6A52DA] duration-300"
    }

    const hundleRegister = (e) => {
        e.preventDefault()
        const username = e.target[0].value
        const files = e.target[1].value
        console.log(username)
        console.log(files)
    }


    return (
        <form className={stl.form} onSubmit={hundleRegister}>
            <h1 className={stl.h1}>Login</h1>
            <input className={stl.input} type="text" placeholder="Username" onChange={(e) => setUserdata({ ...userdata, username: e.target.value })} />
            <input className={stl.input} type="password" placeholder="Password" onChange={(e) => setUserdata({ ...userdata, username: e.target.value })} />
            <div className="">
                <input className="mt-[30px]" type="file" />
            </div>
            <button className={stl.btn}>Send OTP</button>
        </ form >
    )
}

export default Register