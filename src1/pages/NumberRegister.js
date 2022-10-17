import React from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import "react-phone-number-input/style.css"
import { useState } from "react";

import { auth } from "../firebase/firebaseConfig"
import PhoneInput from 'react-phone-number-input'
import TelegramImg from "../images/telegram.svg"
import { useNavigate } from "react-router-dom"
function NumberRegister() {
    const navigate = useNavigate()
    const [config, setConfig] = useState({
        number: "+998",
        varifyCode: "",
        flag: false,
        confirmObj: "",
        error: ""
    })
    // console.log(config)
    const stl = {
        register: "flex flex-col items-center w-full h-[100vh] bg-[#212121] ",
        img: "w-[170px] xl:mt-[60px]",
        h1: "text-[35px] text-[#FFFFFF] my-[30px] font-semibold",
        p: "my-2 w-[300px] text-center text-[#AAAAAA]",
        input: "input w-[365px] h-[170px] rounded-[30px] mt-[40px] text-[30px] p-2 flex flex-col items-center  ",
        btn: "text-[20px] text-[#FFFFFF] font-sans w-[350px] h-[55px] border-none p-2 bg-[#8774E1] rounded hover:bg-[#6A52DA] duration-300"
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

    const hundleVarified = async (e) => {
        e.preventDefault()
        setConfig({ ...config, error: "Varified Nimadur xato" })

        if (config.varifyCode === "" || config.varifyCode === undefined)
            return setConfig({ ...config, error: "varifiedcode Nimadur xato" })
        try {
            config.confirmObj.confirm(config.varifyCode)
            setConfig({ ...config, flag: false })
            navigate("/register")


        } catch (error) {
            setConfig({ ...config, error: "Varified catch Nimadur xato" })
        }
    }
    return (
        <div className="">
            <form className={stl.register} onSubmit={HundleFunc}
                style={{ display: config.flag ? "none" : "flex" }}>
                <img className={stl.img} src={TelegramImg} alt="" />
                <h1 className={stl.h1}>Sign in to Telegram</h1>
                <p className={stl.p}>Please confirm your country and <br />
                    enter your phone number.</p>
                <PhoneInput
                    className={stl.input}
                    defaultCountry='UZ'
                    value={config.number}
                    onChange={(e) => setConfig({ ...config, number: e })}
                />
                <button className={stl.btn}>NEXT</button>
                <div id="recaptcha-container"></div>
            </form>
            <form className={stl.form} onSubmit={hundleVarified}
                style={{ display: config.flag ? "flex" : "none" }}>

                <input className={stl.input} type="number" placeholder="number" onChange={(e) => setConfig({ ...config, varifyCode: e.target.value })} />

                <button className={stl.btn}>Send OTP</button>
            </form>
        </div>

    )
}

export default NumberRegister