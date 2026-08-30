import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export const Comentario = sequelize.define(
    "Comentario",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        texto: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        atividade_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "comentarios",
        timestamps: true
    }
);