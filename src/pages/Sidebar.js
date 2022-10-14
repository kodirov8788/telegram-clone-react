import React from 'react'
import { GoThreeBars } from "react-icons/go"
import { BsSearch } from "react-icons/bs"
const Sidebar = () => {
    const style = {
        sidebar: "w-[400px] h-[100vh] bg-[#212121] relative z-10",
        sidebar_nav: "w-[400px] h-[140px] border-b-[2px] flex flex-col justify-center border-[#131313]  ",
        nav: "w-[400px] h-[80px] flex items-center border-[#fff] border-[px]",
        nav_fabars_right: "ml-[10px] w-[45px]  h-[45px] rounded-full flex justify-center items-center text-[#AAAAAA] text-[25px] hover:bg-[#2B2B2B] ",
        nav_left: "w-[310px] ml-[10px] h-[45px] bg-[#181818] hover:border-[gray] hover:border-[1px] rounded-[30px] flex items-center",
        BsSearch: "text-[19px] text-[#6C6C6C] ml-[18px]",
        nav_left_input: "w-[275px] h-[43px]  bg-[#181818] text-[19px] text-[#fff] focus:outline-none indent-[15px] rounded-[30px] ",
        ul: "w-[400px] h-[60px]  text-[#fff] flex justify-center text-[20px]  list-none flex items-center overflow-x-auto snap-none scroller ",
        ul_a: "m-[20px]",

    }
    return (
        <div className={style.sidebar}>
            <div className={style.sidebar_nav}>
                <div className={style.nav}>
                    <div className={style.nav_fabars_right}>
                        <GoThreeBars />
                    </div>
                    <div className={style.nav_left}>
                        <BsSearch className={style.BsSearch} />
                        <input className={style.nav_left_input} type="text" placeholder='Search' />
                    </div>
                </div>

                <div className={style.ul}>
                    <li><a className={style.ul_a} href="#">Bce</a></li>
                    <li><a className={style.ul_a} href="#">Private</a></li>
                    <li><a className={style.ul_a} href="#">Groups</a></li>
                    <li><a className={style.ul_a} href="#">Channels</a></li>

                </div>
            </div>

        </div>
    )
}

export default Sidebar