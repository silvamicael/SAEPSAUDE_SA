import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export const Empresa = sequelize.define(
    "Empresa",
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
        logo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: "empresas",
        timestamps: false
    }
);