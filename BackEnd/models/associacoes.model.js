import { Usuario } from "./usuario.model.js";
import { Atividade } from "./atividade.model.js";

Usuario.hasMany(Atividade, {
    foreignKey: "usuario_id",
    as: "atividades"
});

Atividade.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    as: "usuario"
});

export {
    Usuario,
    Atividade
};