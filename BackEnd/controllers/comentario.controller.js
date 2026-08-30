import { Comentario } from "../models/associacoes.model.js";

export async function comentarAtividade(req, res) {
    try {
        const { id: atividade_id } = req.params;
        const { usuario_id, texto } = req.body;

        if (!usuario_id) {
            return res.status(400).json({ mensagem: "usuario_id obrigatório" });
        }

        if (!texto || texto.trim().length === 0) {
            return res.status(400).json({ mensagem: "não é possível enviar um comentário vazio" });
        }

        if (texto.trim().length <= 2) {
            return res.status(400).json({ mensagem: "comentário muito curto" });
        }

        const comentario = await Comentario.create({
            usuario_id,
            atividade_id,
            texto: texto.trim()
        });

        const totalComentarios = await Comentario.count({ where: { atividade_id } });

        res.status(201).json({ comentario, totalComentarios });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao comentar atividade" });
    }
}