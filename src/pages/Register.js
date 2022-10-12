import React from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import "react-phone-number-input/style.css"
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig"
import PhoneInput from 'react-phone-number-input'
import TelegramImg from "../images/telegram.svg"
function Register() {
    const [config, setConfig] = useState({
        number: "+998",
        varifyCode: "",
        flag: false,
        confirmObj: "",
        error: ""
    })
    console.log(config)
    const stl = {
        register: "flex flex-col items-center",
        img: "w-1/5",
        h1: "text-[40px] my-3 font-semibold",
        p: "my-2 w-[300px] text-center text-gray-500",
        input: "input text-[30px] p-2 flex flex-col items-center  ",
        btn: "text-[30px] border border-black p-2 bg-red-500 rounded hover:bg-blue-400 duration-300"
    }

    function setRecaptcha(PhoneNumber) {
        console.log(PhoneNumber)
        const Recaptchavarifier = new RecaptchaVerifier("recaptcha-container", {}, auth)
        Recaptchavarifier.render()
        return signInWithPhoneNumber(auth, PhoneNumber, Recaptchavarifier)
    }

    const HundleFunc = async (e) => {
        e.preventDefault()
        if (config.number === undefined || config.number === "" || config.number === "+998") {
            setConfig({ ...config, error: "Nimadur xato" })

        } else {
            try {
                console.log("sdadas")
                const response = await setRecaptcha(config.number)
                console.log(response)
                setConfig({ ...config, flag: true, confirmObj: response })
            }
            catch (error) {
                setConfig({ ...config, error: "catch Nimadur xato" })
            }
        }

    }
    return (
        <form className={stl.register} onSubmit={HundleFunc}>
            <img className={stl.img} src={TelegramImg} alt="" />
            <h1 className={stl.h1}>Sign in to Telegram</h1>
            <p className={stl.p}>Please confirm your country and
                enter your phone number.</p>
            <PhoneInput
                className={stl.input}
                defaultCountry='UZ'
                value={config.number}
                onChange={(e) => setConfig({ ...config, number: e })}
            />
            <button className={stl.btn}>Next</button>
            <div id="recaptcha-container"></div>
        </form>
    )
}

export default Register