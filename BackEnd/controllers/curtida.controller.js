import { Curtida } from "../models/associacoes.model.js";

export async function curtirAtividade(req, res) {
    try {
        const { id: atividade_id } = req.params;
        const { usuario_id } = req.body;

        if (!usuario_id) {
            return res.status(400).json({ mensagem: "usuario_id obrigatório" });
        }

        const curtidaExistente = await Curtida.findOne({
            where: { usuario_id, atividade_id }
        });

        let curtiu;
        if (curtidaExistente) {
            await curtidaExistente.destroy();
            curtiu = false;
        } else {
            await Curtida.create({ usuario_id, atividade_id });
            curtiu = true;
        }

        const totalCurtidas = await Curtida.count({ where: { atividade_id } });

        res.json({ curtiu, totalCurtidas });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao curtir atividade" });
    }
}