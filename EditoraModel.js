import {DataTypes} from "sequelize";
import banco from "../banco.js";

export default banco.define(
    'editora',
    {
      // Model attributes are defined here
      ideditora: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nomeeditora: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      cnpj: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      endereco: {
        type: DataTypes.TEXT,
        allowNull: true
      },
    }
  );
