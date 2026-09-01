import { useState, useEffect } from "react";
import { getPerfil } from "../services/api";

function Perfil({ usuario }) {
  const [dadosPerfil, setDadosPerfil] = useState(null);

  useEffect(() => {
    getPerfil(usuario?.id).then(setDadosPerfil);
  }, [usuario]);

  if (!dadosPerfil) return null;

  const nome = usuario ? usuario.nome : dadosPerfil.empresa.nome;
  const imagem = usuario ? `/avatars/${usuario.imagem}` : `/${dadosPerfil.empresa.logo}`;

  return (
    <aside className="perfil">
      <div className="perfil-topo">
        <img src={imagem} alt={nome} className="perfil-logo" />
        <h2 className="perfil-nome">{nome}</h2>

        <div className="perfil-stats">
          <div>
            <strong>{dadosPerfil.totalAtividades}</strong>
            <span>Qtd. Atividades</span>
          </div>
          <div>
            <strong>{dadosPerfil.totalCalorias}</strong>
            <span>Qtd. Calorias</span>
          </div>
        </div>

        <button className="botao-atividade" disabled={!usuario}>
          <img src="/icons/progresso.svg" alt="" className="icone-botao" />
          Atividade
        </button>
      </div>

      <footer className="perfil-rodape">
        <p>SAEPSaúde</p>
        <div className="rodape-icones">
          <img src="/icons/instagram.svg" alt="Instagram" />
          <img src="/icons/twitter.svg" alt="Twitter" />
          <img src="/icons/tiktok.svg" alt="TikTok" />
        </div>
        <small>Copyright-2024</small>
      </footer>
    </aside>
  );
}

export default Perfil;