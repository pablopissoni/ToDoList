const express = require("express");
const router = express.Router();
const { Task } = require("../db.js");
const { route } = require("./index.js");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    return res.status(500).json({
      message: "Error al obtener las tareas",
    });
  }
});

router.post("/", async function (req, res, next) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Se necesita ingresar un titulo",
    });
  }

  try {
    //? Verifico que no haya una tarea con el mismo titulo
    const existingTask = await Task.findOne({
      where: {
        title: title,
      },
    });

    if (existingTask) { //? si hay una igual se envia un 400
      return res.status(400).json({
        message: "Ya existe una tarea con ese titulo",
      });
    }
    //------------
    const newTask = await Task.create({
      title: title,
    });

    console.log("Se agrego la tarea");
    return res.status(201).json(newTask);
  } catch (error) {
    console.log("no se pudo crear la tarea: ", error);
    return res.status(500).json({
      message: "Error al crear la tarea",
    });
  }
});

router.put("/:task_id", async function (req, res, next) {
  const { task_id } = req.params;
  const task = req.body;

  try {
    const updatedRows = await Task.update(
      {
        checked: task.checked,
      },
      {
        where: {
          id: task_id,
        },
      }
    );

    if (updatedRows > 0) {
      return res.status(200).json({
        message: "Tarea actualizada exitosamente",
      });
    } else {
      return res.status(404).json({
        message: "No se encontró la tarea para actualizar",
      });
    }
  } catch (error) {
    console.error("Error al actualizar la tarea: ", error);
    return res.status(500).json({
      message: "Error al actualizar la tarea",
    });
  }
});

router.put("/:task_id", async function (req, res, next) {
  const { task_id } = req.params;

  try {
    // Primero, obténgo la tarea existente para obtener el valor actual de 'checked'
    const existingTask = await Task.findOne({
      where: {
        id: task_id,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "No se encontró la tarea para actualizar",
      });
    }

    // Obtengo el nuevo valor contrario de 'checked'
    const newCheckedValue = !existingTask.checked;

    // Actualiza el valor de 'checked' en la base de datos
    await Task.update(
      {
        checked: newCheckedValue,
      },
      {
        where: {
          id: task_id,
        },
      }
    );

    return res.status(200).json({
      message: "Tarea actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar la tarea: ", error);
    return res.status(500).json({
      message: "Error al actualizar la tarea",
    });
  }
});

module.exports = router;
