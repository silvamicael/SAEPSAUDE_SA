import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export const Atividade = sequelize.define(
    "Atividade",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        tipo_atividade: {
            type: DataTypes.ENUM("caminhada", "corrida", "trilha"),
            allowNull: false
        },

        distancia_percorrida: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        duracao_atividade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        quantidade_calorias: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "atividades",
        timestamps: true
    }
);