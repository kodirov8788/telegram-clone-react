import React, { useContext } from 'react'
import { ChatContextApi } from '../context/ChatContext'
import Telegram from "../images/3.jpg"
import { FaMicrophone } from "react-icons/fa"
import { BsEmojiSmile } from "react-icons/bs"


function Main() {
    const { setEffect } = useContext(ChatContextApi)
    const EffectFunc = () => {
        setEffect(true)
    }
    return (
        <div className=" w-full h-[100vh] bg-blue-300 flex  " onClick={EffectFunc}>
            <img className='w-full h-[100vh]' src={Telegram} alt="" />
            <form className="w-[1135px] h-[200px] flex justify-center items-center  absolute bottom-0" action="">
                <div className="w-[700px] h-[55px] flex items-center rounded-[30px] bg-[#212121] ">
                    <div className="w-[40px] h-[40px] rounded-full ml-[10px] bg-[#212121] text-[#fff] flex justify-center items-center text-[25px]">
                        <BsEmojiSmile />
                    </div>
                    <input className='w-[580px] h-[52px] text-[#fff] text-[20px] border-none outline-none indent-[20px] bg-[#212121] font-mono  rounded-[30px]' type="text" placeholder='Message' />

                </div>
                <div className="w-[55px] h-[55px] border-none rounded-full bg-red-400 hover:bg-[#8774E1] duration-1000  text-[#FFFEFF] flex justify-center items-center text-[28px] ml-[10px]">
                    <FaMicrophone />
                </div>
            </form>
        </div>
    )
}

export default Main