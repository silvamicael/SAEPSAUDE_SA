import { Empresa, Atividade } from "../models/associacoes.model.js";

export async function getPerfil(req, res) {
    try {
        const { usuario_id } = req.query;
        const empresa = await Empresa.findOne();

        const where = usuario_id ? { usuario_id } : {};

        const totalAtividades = await Atividade.count({ where });
        const totalCalorias = (await Atividade.sum("quantidade_calorias", { where })) || 0;

        res.json({ empresa, totalAtividades, totalCalorias });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar dados do perfil" });
    }
}