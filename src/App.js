import Sidebar from "./components/Sidebar";
import { useContext, useEffect } from "react"
import { ChatContextApi } from "./context/ChatContext";
import Main from "./components/Main";

function App() {
  const { chatData } = useContext(ChatContextApi)



  return (
    <div className="flex">
      <Sidebar />
      <Main />


    </div >
  );
}

export default App;
