const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:prototype@localhost:5432/ToDoList') // Example for postgres

const fs = require('fs'); //? busca todos los modelos con extension .js
const path = require('path');
//*------------------------------

//? Carga de todos los modelos ------------------------------
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/model'))
.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
.forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/model', file)));
});

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Task } = sequelize.models

//? Test de coneccion a la base de datos ------------------------------
const conection = async () => {
    try {
        await sequelize.authenticate();
        console.log('*** La conexión a la base de datos se ha realizado correctamente. ***');
  } catch (error) {
      console.error('*** No se pudo conectar a la base de datos: ', error);
    }
}
conection()
//? Test de coneccion a la base de datos ------------------------------

module.exports = {
    ...sequelize.models,
    postgres: sequelize,
};