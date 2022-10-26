import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { UserContextApi } from "./UserContext";
export const ChatContextApi = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(UserContextApi)
    const [effect, setEffect] = useState(false)

    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    }



    const ChatReducer = (state, action) => {
        console.log(action)
        switch (state) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(ChatReducer, INITIAL_STATE)

    return <ChatContextApi.Provider value={{ chatData: state, dispatch, setEffect, effect }}>{children}</ChatContextApi.Provider>
}