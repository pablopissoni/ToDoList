const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "task",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      title: {
        type: DataTypes.STRING,
        alowNull: false,
      },

      checked: {
        type: DataTypes.BOOLEAN,
        // alowNull: false,
        defaultValue: false,
      }
    },

    // {
    //   timestamps: false, //* le quito las comumnas que registarn los datos de guardado y edicion
    // }
  );
};
