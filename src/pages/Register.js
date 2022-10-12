import React from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import "react-phone-number-input/style.css"
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig"
import PhoneInput from 'react-phone-number-input'
import TelegramImg from "../images/telegram.svg"
function Register() {
    const [config, setConfig] = useState({
        number: "",
        varifyCode: "",
        flag: false,
        comfirmObj: "",
        error: ""
    })
    const stl = {
        register: "",
        img: "w-1/5"
    }

    return (
        <div className={stl.register}>
            <img className={stl.img} src={TelegramImg} alt="" />

        </div>
    )
}

export default Register