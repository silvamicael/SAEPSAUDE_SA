import { Router } from "express";
import { comentarAtividade } from "../controllers/comentario.controller.js";

const router = Router();

router.post("/atividades/:id/comentar", comentarAtividade);

export default router;