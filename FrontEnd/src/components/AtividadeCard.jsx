import { formatarData } from "../utils/formatadores";

function AtividadeCard({ atividade, onCurtir }) {
  return (
    <div className="atividade-card">
      <div className="atividade-topo">
        <h3 className="atividade-titulo">{atividade.tipo}</h3>
        <span className="atividade-data">{formatarData(atividade.data)}</span>
      </div>

      <div className="atividade-corpo">
        <img
          src={`/avatars/${atividade.usuario.imagem}`}
          alt={atividade.usuario.nome}
          className="atividade-avatar"
        />
        <span className="atividade-usuario">{atividade.usuario.nome}</span>

        <div className="atividade-metricas">
          <div><strong>{(atividade.distancia / 1000).toFixed(1)} km</strong><span>Distância</span></div>
          <div><strong>{atividade.duracao} min</strong><span>Duração</span></div>
          <div><strong>{atividade.calorias}</strong><span>Calorias</span></div>
        </div>

        <div className="atividade-interacoes">
          <button className="botao-curtir" onClick={onCurtir}>
            <img
              src={atividade.jaCurtiu ? "/icons/CoracaoVermelho.svg" : "/icons/coracao.svg"}
              alt="Curtir"
            />
            {atividade.curtidas}
          </button>
          <button className="botao-comentar">
            <img src="/icons/comentario.svg" alt="Comentar" />
            {atividade.comentarios}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AtividadeCard;