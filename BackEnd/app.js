import "dotenv/config";
import cors from "cors";
import express from "express";
import sequelize from "./config/database.js";
import "./models/associacoes.model.js";
import atividadeRoutes from "./routes/atividade.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import curtidaRoutes from "./routes/curtida.routes.js";
import comentarioRoutes from "./routes/comentario.routes.js";
import empresaRoutes from "./routes/empresa.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(atividadeRoutes);
app.use(usuarioRoutes);
app.use(curtidaRoutes);
app.use(empresaRoutes);
app.use(comentarioRoutes);

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