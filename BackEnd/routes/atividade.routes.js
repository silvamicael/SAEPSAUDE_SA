import { Router } from "express";
import { listarAtividades } from "../controllers/atividade.controller.js";

const router = Router();

router.get("/atividades", listarAtividades);

export default router;