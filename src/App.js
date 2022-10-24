import Sidebar from "./pages/Sidebar";
import { useContext } from "react"
import { ChatContextApi } from "./context/ChatContext";

function App() {
  const { chatData } = useContext(ChatContextApi)
  console.log("chat data:", chatData)

  return (
    <div className="App">
      <Sidebar />
    </div>
  );
}

export default App;
