import { Usuario } from "../models/associacoes.model.js";

export async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: "email ou senha obrigatório" });
        }

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ mensagem: "email ou senha incorreta" });
        }

        res.json({
            id: usuario.id,
            nome: usuario.nome,
            imagem: usuario.imagem,
            email: usuario.email
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao efetuar login" });
    }
}