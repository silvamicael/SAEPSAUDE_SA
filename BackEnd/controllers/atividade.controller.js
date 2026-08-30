import { Atividade, Usuario, Curtida, Comentario } from "../models/associacoes.model.js";

export async function listarAtividades(req, res) {
    try {
        const { tipo, pagina = 1 } = req.query;
        const limite = 4;
        const offset = (pagina - 1) * limite;

        const where = tipo ? { tipo_atividade: tipo } : {};

        const { count, rows } = await Atividade.findAndCountAll({
            where,
            include: [{ model: Usuario, as: "usuario", attributes: ["nome", "imagem"] }],
            order: [["createdAt", "DESC"]],
            limit: limite,
            offset
        });

        const atividades = await Promise.all(
            rows.map(async (atividade) => ({
                id: atividade.id,
                tipo: atividade.tipo_atividade,
                distancia: atividade.distancia_percorrida,
                duracao: atividade.duracao_atividade,
                calorias: atividade.quantidade_calorias,
                data: atividade.createdAt,
                usuario: atividade.usuario,
                curtidas: await Curtida.count({ where: { atividade_id: atividade.id } }),
                comentarios: await Comentario.count({ where: { atividade_id: atividade.id } })
            }))
        );

        res.json({
            atividades,
            paginaAtual: Number(pagina),
            totalPaginas: Math.ceil(count / limite)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao listar atividades" });
    }
}