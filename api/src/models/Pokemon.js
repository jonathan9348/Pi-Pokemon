const { DataTypes, TEXT } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      imageCard: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      imageDetail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      hp: {
        type: DataTypes.INTEGER,
      },

      attack: {
        type: DataTypes.INTEGER,
      },

      defense: {
        type: DataTypes.INTEGER,
      },

      speed: {
        type: DataTypes.INTEGER,
      },

      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      createdDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    { timestaps: false }
  );
};
