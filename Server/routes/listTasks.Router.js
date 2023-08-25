const express = require("express"); // importo express para crear rutas
const router = express.Router();
const { Task } = require("../db.js");
const { getTasks, newTask, switchChecked, changeChecked, deleteTask } = require("../controllers/listTask.js");
const { route } = require("./index.js");

/* GET users listing. */
router.get("/", getTasks); //* GET obtener la lista de tareas

router.post("/", newTask); //* POST crear una nueva tarea

router.put("/:checked_id", switchChecked); //* PUT Invierte el valor de Checked

router.put("/:task_id", changeChecked); //* PUT Cambia el valor de Checked a un valor especifico por body
  
router.delete("/:task_id", deleteTask) //* DELETE Elimina una tarea

module.exports = router;
