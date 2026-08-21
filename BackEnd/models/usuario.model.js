import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export const Usuario = sequelize.define(
    "Usuario",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        nome_usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        imagem: {
            type: DataTypes.STRING,
            allowNull: true
        },

        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "usuarios",
        timestamps: true
    }
);