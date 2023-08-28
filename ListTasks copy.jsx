import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify"; //? Alert de React-toastify
import { notifyError, notifyInfo, notifySuccess } from "./alertsToastify";

export const ListTasks = () => {
  const [newTask, setNewTask] = useState("");
  const [listTasks, setListTasks] = useState([]);

  //*--------------------- PETICIONES ------------------------------
  //* GET lista de tareas ---
  const getTasks = async () => {
    const response = await axios.get("http://localhost:3000/listtasks");
    response.data.length
      ? setListTasks(response.data)
      : setListTasks([{ id: 1, title: "No hay tareas cargadas! 😁👍" }]);
    console.log("response.data:", response.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  //* POST Nueva tarea ---
  const newTaskRequest = async () => {
    try {
      if (newTask) {
        const response = await axios.post("http://localhost:3000/listtasks", {
          title: newTask,
        });
        console.log("Se creo la tarea :", response.data);
        getTasks(); //* Actualizar la lista de tareas
        setNewTask(""); //* Limpiar el input
      } else {
        notifyError("Ingrese una tarea!"); //? Alerta si No hay tarea
      }
    } catch (error) {
      notifyError("La tarea ya existe!"); //? Alerta si Ya esta repetido al intentar guardar
      console.log("Error al crear una nueva tarea (Front): ", error);
    }
  };

  //* Borrar tarea ---
  const deleteTaskRequest = async (task_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/listtasks/${task_id}`
      );
      notifyInfo("Tarea borrada!"); //? Alerta de tarea borrada
      console.log("Se borro la tarea :", response.data);
      getTasks(); //* Actualizar la lista de tareas
    } catch (error) {
      console.log("Error al borrar una tarea (Front): ", error);
    }
  };
  //* Borrar TODAS las tareas ---
  const deleteAllTaskRequest = async () => {
    try {
      if (listTasks[0].id === 1) {
        notifyError("No hay tareas para eliminar!"); //? Alerta si No hay tarea
      } else {
        const response = await axios.delete(
          `http://localhost:3000/listtasks/deleteAll`
        );
        notifyInfo("Todas las tareas borradas!"); //? Alerta de tareas borradas
        console.log("Se borro todas las Tareas :", response.data);
        getTasks(); //* Actualizar la lista de tareas
      }
    } catch (error) {
      console.log("Error al borrar una tarea (Front): ", error);
    }
  };
  //* Completar tarea ---
  const completeTaskRequest = async (task_id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/listtasks/${task_id}`
      );
      notifySuccess("Genial !!");
      getTasks(); //* Actualizar la lista de tareas
    } catch (error) {
      console.log("Error al completar una tarea (Front): ", error);
    }
  };
  //*--------------------- PETICIONES ------------------------------

  //*------ FUNCIONES -------------

  const handleChange = (e) => {
    const { value } = e.target;
    setNewTask(value);
  };

  //*------------------------------------
  return (
    <div className="w-1/3 ml-10 mt-10 p-2 bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center shadow-md rounded-lg bg-slate-400">
        LISTAS DE TAREAS
      </h2>
      <ToastContainer /> {/*Alert de React-toastify*/}
      {/* ---------- NUEVA TAREA ---------- */}
      <div className="m-2 flex items-center">
        <input
          className="appearance-none h-10 w-3/4 bg-gray-100 text-gray-700 border border-gray-500 py-3 px-4 leading-tight focus:outline-none focus:bg-white rounded-l-lg"
          value={newTask}
          type="text"
          onChange={handleChange}
          onKeyDown={(e) => (e.key === "Enter" ? newTaskRequest() : null)}
          placeholder="Cual es su nueva tarea?"
        />

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold  py-2 px-4 h-10 rounded-r-lg"
          onClick={newTaskRequest}
        >
          ➕
        </button>
        <button
          className="bg-red-800 hover:bg-red-600 text-white font-bold ml-4 p-2 h-10 rounded-lg"
          onClick={deleteAllTaskRequest}
        >
          🗑️
        </button>
      </div>
      <div className="overflow-x-auto  ">
        {/* <h3>{productsSlice.products.length}</h3> */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs  text-gray-700 uppercase rounded-lg  bg-slate-200">
            <tr>
              <th scope="col" className="px-4 py-3">
                TAREAS
              </th>

              <th scope="col" className="w-1/4 px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="">
            {/* ---------- LISTA DE TAREAS ---------- */}
            {listTasks?.map((task, index) => (
              <tr
                className={`shadow-md rounded-lg my-2 bg-blue-200 dark:border-gray-700 `}
                key={task.id}
              >
                <td
                  className={`px-6 py-1 font-medium  text-gray-900 ${
                    task?.checked ? "line-through text-inherit" : ""
                  } `}
                >
                  <div className="w-auto ">{task.title}</div>
                </td>

                <td className="px-1 py-1 font-medium text-gray-900 whitespace-nowrap ">
                  {task.id !== 1 && (
                    <>
                      <button
                        onClick={() => completeTaskRequest(task.id)}
                        className="pl-6"
                      >
                        ✔️
                      </button>
                      <button
                        onClick={() => deleteTaskRequest(task.id)}
                        className="pl-6"
                      >
                        ✖️
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
