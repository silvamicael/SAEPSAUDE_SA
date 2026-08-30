import { Router } from "express";
import { getPerfil } from "../controllers/empresa.controller.js";

const router = Router();

router.get("/perfil", getPerfil);

export default router;