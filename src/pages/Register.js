import React, { useState } from 'react'
import "react-phone-number-input/style.css"
import { useNavigate } from "react-router-dom"
function Register() {
    const [userdata, setUserdata] = useState({
        username: "",
        image: ""
    })

    const stl = {
        register: "flex flex-col items-center w-full h-[100vh] bg-[#212121] ",
        img: "w-[170px] xl:mt-[60px]",
        h1: "text-[35px] text-[#FFFFFF] my-[30px] font-semibold",
        p: "my-2 w-[300px] text-center text-[#AAAAAA]",
        input: "input w-[365px] h-[170px] rounded-[30px] mt-[40px] text-[30px] p-2 flex flex-col items-center  ",
        btn: "text-[20px] text-[#FFFFFF] font-sans w-[350px] h-[55px] border-none p-2 bg-[#8774E1] rounded hover:bg-[#6A52DA] duration-300"
    }
    const hundleRegister = (e) => {
        e.preventDefault()
        const username = e.target[0].value
        const file = e.target[1].files[0]
        console.log(username)
        console.log(file)
    }
    return (
        <form className={stl.form} onSubmit={hundleRegister}>
            <input type="text" placeholder="Username ..." onChange={(e) => setUserdata({ ...userdata, username: e.target.value })} />

            <div className="">
                <input type="file" />
            </div>

            <button className={stl.btn}>Create user</button>
        </form>

    )
}

export default Register