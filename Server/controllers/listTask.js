const { Task } = require("../db");

const getTasks = async (req, res) => { //* GET obtener la lista de tareas
  try {
    const tasks = await Task.findAll();
    const tasksOrder = tasks.sort((a, b) => {
      //?Ordeno las tareas de mas nueva a mas vieja
      return a.createdAt - b.createdAt;
    });
    return res.status(200).json(tasksOrder);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    return res.status(500).json({
      message: "Error al obtener las tareas",
    });
  }
};

const newTask = async (req, res) => { //* POST crear una nueva tarea
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
};

const switchChecked = async (req, res) => { //* PUT Invierte el valor de Checked
  const { checked_id } = req.params;

  try {
    // Primero, obténgo la tarea existente para obtener el valor actual de 'checked'
    const existingTask = await Task.findOne({
      where: {
        id: checked_id,
      },
    });
    console.log(
      "🚀 ~ file: listTasks.Router.js:99 ~ existingTask:",
      existingTask
    );

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
          id: checked_id,
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
};

const changeChecked = async (req, res) => { //* PUT Cambia el valor de Checked a un valor especifico por body

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
};

const deleteTask = async (req, res) => { //* DELETE Elimina una tarea
  const { task_id } = req.params;
  
  try {
    const deletedTask = await Task.destroy({
      where: {
        id: task_id,
      },
    });
    
    if (deletedTask > 0) {
      return res.status(200).json({
        message: "Tarea eliminada exitosamente",
      });
    } else {
      return res.status(404).json({
        message: "No se encontrón tareas para eliminar",
      });
      }
  } catch (error) {
    console.error("Error al eliminar la tarea: ", error);
    return res.status(500).json({
      message: "Error al eliminar la tarea",
    });
  }
}

const deleteAllTask = async (req, res) => { //* DELETE Elimina todas las tareas
  try{
    const deletedTasks = await Task.destroy({
      where: {},
    });

    if (deletedTasks > 0) {
      return res.status(200).json({
        message: "Todas las tareas eliminadas",
      });
    } else {
      return res.status(404).json({
        message: "No se encontro tareas para eliminar",
      });
    }
    
  

  } catch (error) {
    console.error("Error al eliminar las tareas: ", error);
    return res.status(500).json({
      message: "Error al eliminar las tareas",
    });
  
  } 
}

module.exports = {
  getTasks,
  newTask,
  switchChecked,
  changeChecked,
  deleteTask,
  deleteAllTask
};
