import { Usuario } from "./usuario.model.js";
import { Atividade } from "./atividade.model.js";
import { Curtida } from "./curtida.model.js";
import { Comentario } from "./comentario.model.js";
import { Empresa } from "./empresa.model.js";

Usuario.hasMany(Atividade, { foreignKey: "usuario_id", as: "atividades" });
Atividade.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Atividade.hasMany(Curtida, { foreignKey: "atividade_id", as: "curtidas" });
Curtida.belongsTo(Atividade, { foreignKey: "atividade_id", as: "atividade" });
Usuario.hasMany(Curtida, { foreignKey: "usuario_id", as: "curtidas" });
Curtida.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Atividade.hasMany(Comentario, { foreignKey: "atividade_id", as: "comentarios" });
Comentario.belongsTo(Atividade, { foreignKey: "atividade_id", as: "atividade" });
Usuario.hasMany(Comentario, { foreignKey: "usuario_id", as: "comentarios" });
Comentario.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

export { Usuario, Atividade, Curtida, Comentario, Empresa };