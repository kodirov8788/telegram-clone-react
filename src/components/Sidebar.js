import React, { useState, useContext } from 'react'
import { GoThreeBars } from "react-icons/go"
import { sidebar_data } from '../static_data'
import SidebarTools from './SidebarTools'
import { ChatContextApi } from '../context/ChatContext'
import Search from './Search'

const Sidebar = () => {
    const { effect } = useContext(ChatContextApi)
    // console.log(effect)
    const style = {
        sidebar: "w-[400px] h-[100vh] bg-[#212121] relative z-10",
        sidebar_nav: "w-[400px] h-[140px] border-b-[2px] flex flex-col justify-center border-[#131313]  relative ",
        nav: "w-[400px] h-[80px] flex items-center border-[#fff] border-[px]",
        nav_fabars_right: "ml-[10px] w-[45px]  h-[45px] rounded-full flex justify-center items-center text-[#AAAAAA] text-[25px] hover:bg-[#2B2B2B] ",
        nav_left: "w-[310px] ml-[10px] h-[45px] bg-[#181818] hover:border-[gray] hover:border-[1px] rounded-[30px] flex items-center",
        BsSearch: "text-[19px] text-[#6C6C6C] ml-[18px]",
        nav_left_input: "w-[275px] h-[43px]  bg-[#181818] text-[19px] text-[#fff] focus:outline-none indent-[15px] rounded-[30px] ",
        ul: "w-[400px] h-[60px]  text-[#fff] font-mono flex justify-center text-[18px]  list-none flex items-center overflow-x-auto snap-none scroller ",
        ul_a: "m-[20px]",

    }
    return (
        <div className={style.sidebar}>
            <SidebarTools />
            <div className={style.sidebar_nav}>

                <div className={style.nav}>
                    <div className={style.nav_fabars_right}>
                        <GoThreeBars />
                    </div>
                    <Search />
                </div>

                <div className={style.ul}>
                    <li><a className={style.ul_a} href="#">All</a></li>
                    <li><a className={style.ul_a} href="#">Private</a></li>
                    <li><a className={style.ul_a} href="#">Groups</a></li>
                    <li><a className={style.ul_a} href="#">Channels</a></li>

                </div>
            </div>
            <div className=" overflow-y-scroll h-4/5 border-2 border-red-400">
                {sidebar_data.map(item => {
                    return <div className="w-full border-2 border-red-400" key={item.id}>

                        <li className="flex bg-[#212121]  text-[#fff]  mt-[20px] px-3 py-2 cursor-pointer hover:bg-[#6A52DA]  font-mono duration-300">
                            <img className='w-[50px] rounded-full mr-3 object-cover' src={item.userImg} alt="" />
                            <div className="w-full">
                                <h2 className='text-[20px] font-bold'>{item.userName}</h2>
                                <p>{item.lastMessage}</p>
                            </div>
                        </li>
                    </div>
                })}
            </div>

        </div>
    )
}

export default Sidebar