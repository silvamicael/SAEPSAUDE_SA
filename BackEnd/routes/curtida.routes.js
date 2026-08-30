import { Router } from "express";
import { curtirAtividade } from "../controllers/curtida.controller.js";

const router = Router();

router.post("/atividades/:id/curtir", curtirAtividade);

export default router;