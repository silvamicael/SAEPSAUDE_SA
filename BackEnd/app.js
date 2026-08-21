import "dotenv/config";
import express from "express";
import sequelize from "./config/database.js";
import "./models/associations.js";

const app = express();

app.get("/", (req, res) => {
    res.json({
        mensagem: "API funcionando!",
        status: "online"
    });
});

app.get("/teste", (req, res) => {
    res.json({
        mensagem: "Rota de teste funcionando!"
    });
});

async function iniciarServidor() {
    try {
        await sequelize.authenticate();
        console.log("Banco de dados conectado!");
        await sequelize.sync({ alter: true });
        console.log("Tabelas sincronizadas!");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Erro ao iniciar a aplicação:");
        console.error(error);
    }
}

iniciarServidor();

export default app;