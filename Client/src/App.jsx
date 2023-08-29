import reactLogo from "./assets/react.svg";
import "./App.css";
import { ListTasks } from "./components/ListTasks";



function App() {

  //*--------------------------------------------------------
  return (
    <div className="bg-gray-600 h-screen">

      <div className="flex space-x-4">
        <ListTasks />
      </div>
      
    </div>
  );
}

export default App;
