import { Atividade, Usuario, Curtida, Comentario } from "../models/associacoes.model.js";

export async function listarAtividades(req, res) {
    try {
        const { tipo, pagina = 1, usuario_id, minhas } = req.query;
        const limite = 4;
        const offset = (pagina - 1) * limite;

        const where = {};
        if (tipo) where.tipo_atividade = tipo;
        if (minhas === "true" && usuario_id) where.usuario_id = usuario_id;

        const { count, rows } = await Atividade.findAndCountAll({
            where,
            include: [{ model: Usuario, as: "usuario", attributes: ["nome", "imagem"] }],
            order: [["createdAt", "DESC"]],
            limit: limite,
            offset
        });

        const atividades = await Promise.all(
            rows.map(async (atividade) => {
                const jaCurtiu = usuario_id
                    ? (await Curtida.count({ where: { atividade_id: atividade.id, usuario_id } })) > 0
                    : false;

                return {
                    id: atividade.id,
                    tipo: atividade.tipo_atividade,
                    distancia: atividade.distancia_percorrida,
                    duracao: atividade.duracao_atividade,
                    calorias: atividade.quantidade_calorias,
                    data: atividade.createdAt,
                    usuario: atividade.usuario,
                    curtidas: await Curtida.count({ where: { atividade_id: atividade.id } }),
                    comentarios: await Comentario.count({ where: { atividade_id: atividade.id } }),
                    jaCurtiu
                };
            })
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

export async function criarAtividade(req, res) {
    try {
        const { usuario_id, tipo_atividade, distancia_percorrida, duracao_atividade, quantidade_calorias } = req.body;

        if (!usuario_id) {
            return res.status(400).json({ mensagem: "usuario_id obrigatório" });
        }

        const campos = { tipo_atividade, distancia_percorrida, duracao_atividade, quantidade_calorias };
        for (const [campo, valor] of Object.entries(campos)) {
            if (valor === undefined || valor === null || valor === "") {
                return res.status(400).json({ mensagem: "Campo obrigatório", campo });
            }
        }

        const tiposValidos = ["corrida", "caminhada", "trilha"];
        if (!tiposValidos.includes(tipo_atividade)) {
            return res.status(400).json({ mensagem: "tipo_atividade inválido" });
        }

        const atividade = await Atividade.create({
            tipo_atividade,
            distancia_percorrida,
            duracao_atividade,
            quantidade_calorias,
            usuario_id
        });

        res.status(201).json(atividade);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao criar atividade" });
    }
}