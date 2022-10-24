import React, { useContext } from 'react'
import { ChatContextApi } from '../context/ChatContext'

function SidebarTools() {
    const { effect } = useContext(ChatContextApi)
    console.log(effect)

    return (<>
        <div className={`w-full h-full bg-blue-300 absolute top-0 z-10 flex ${effect ? "translate-x-[-1000px]" : "translate-x-[0]"} duration-1000`}>
            <div className="w-4/5 bg-red-300 h-full">

            </div>
            <div className="w-1/5 bg-[#00000050] h-full">

            </div>
        </div>


    </>)
}

export default SidebarTools