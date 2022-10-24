import React, { useContext } from 'react'
import { ChatContextApi } from '../context/ChatContext'


function Main() {
    const { setEffect } = useContext(ChatContextApi)
    const EffectFunc = () => {
        setEffect(true)
    }
    return (
        <div className="bg-[#00000050] w-full h-full absolute left-0" onClick={EffectFunc}></div>
    )
}

export default Main