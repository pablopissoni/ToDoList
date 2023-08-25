import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { ListTasks } from "./components/ListTasks";



function App() {
  const [listTasks, setListTasks] = useState([]);
  
  //*--------------- Obtener lista de tareas --------------------------
  const getTasks = async () => {
    const response = await axios.get("http://localhost:3000/listtasks");
    console.log("response.data:", response.data);
    setListTasks(response.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  // console.log("🚀 ~ file: App.jsx:12 ~ App ~ listTasks:", listTasks)
  //*--------------------------------------------------------
  return (
    <div className="bg-gray-600 h-screen">

      <div className="flex space-x-4">
        <ListTasks listTasks={listTasks} getTasks={getTasks}/>
      </div>
      
    </div>
  );
}

export default App;
