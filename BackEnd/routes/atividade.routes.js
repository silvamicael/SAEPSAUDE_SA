import { Router } from "express";
import { listarAtividades, criarAtividade } from "../controllers/atividade.controller.js";

const router = Router();

router.get("/atividades", listarAtividades);
router.post("/atividades", criarAtividade);

export default router;