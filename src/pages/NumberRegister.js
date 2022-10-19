import React from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import "react-phone-number-input/style.css"
import { useState, useContext } from "react";
import { auth, db } from "../firebase/firebaseConfig"
import PhoneInput from 'react-phone-number-input'
import TelegramImg from "../images/telegram.svg"
import { useNavigate } from "react-router-dom"
import { UserContextApi } from "../context/UserContext"
import { collection, addDoc } from "firebase/firestore";

function NumberRegister() {
    const { userData, currentUser } = useContext(UserContextApi)
    // console.log(userData)
    // console.log(currentUser)
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
        form: "w-full h-[100vh] flex flex-col justify-center items-center bg-[#000] relative",
        register: "flex flex-col items-center w-full h-[100vh] bg-[#212121] ",
        img: "w-[170px]  xl:mt-[60px]",
        h1: "text-[30px] text-[#FFFFFF] font-mono my-[30px]  font-semibold",
        h2: "text-[65px] text-[#FFFFFF] font-mono my-[30px]  font-semibold",
        p: "my-2 w-[300px] text-center text-[#AAAAAA]",
        input: "input w-[365px] h-[48px]` mt-[20px] outline-none  indent-[14px] font-mono  hover:border-[#6A52DA] border-transparent border-[3px] font-semibold rounded-[30px] text-[#000] text-[20px] p-2 flex flex-col items-center  ",

        btn: "text-[20px] text-[#FFFFFF] mt-[30px] font-sans w-[350px] h-[55px] border-none p-2 bg-[#8774E1] rounded hover:bg-[#6A52DA] duration-300"

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
            alert("Inputni to'ldiring!")

        } else {
            try {
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
        const isUser = userData.some(item => config.number.includes(item.data.number))

        if (config.varifyCode === "" || config.varifyCode === undefined) {
            setConfig({ ...config, error: "Varified Nimadir xato" })
            alert("codeni kiriting!")
        }
        else {
            try {
                if (isUser) {
                    navigate("/")
                } else {
                    config.confirmObj.confirm(config.varifyCode)
                        .then(async () => {
                            await addDoc(collection(db, "users"), {
                                username: "",
                                number: config.number,
                                imgLink: "",
                                uuid: ""
                            });

                            setConfig({ ...config, flag: false })
                            navigate("/register")
                        })
                        .catch(() => {
                            alert("code hato, qayta urunib koring!")
                        })
                }



            } catch (error) {
                setConfig({ ...config, error: "Varified catch Nimadir xato" })
            }
        }

    }


    return (
        <div className="">
            <form className={stl.register} onSubmit={HundleFunc} style={{ display: config.flag ? "none" : "flex" }}>
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
                <h1 className={stl.h2}> Code sent to {config.number}</h1>
                <input className={stl.input} type="number" placeholder="number" onChange={(e) => setConfig({ ...config, varifyCode: e.target.value })} />
                <button className={stl.btn}>Send OTP</button>
            </ form >
        </div>

    )
}

export default NumberRegister;