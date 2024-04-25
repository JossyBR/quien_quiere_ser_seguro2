const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "preguntas",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      preguntas: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      respuesta1: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      respuesta2: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      respuesta3: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      respuesta4: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      respuesta_correcta: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
