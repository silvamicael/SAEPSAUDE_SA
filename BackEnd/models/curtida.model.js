import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export const Curtida = sequelize.define(
    "Curtida",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
        tableName: "curtidas",
        timestamps: true,
        indexes: [
            { unique: true, fields: ["usuario_id", "atividade_id"] }
        ]
    }
);