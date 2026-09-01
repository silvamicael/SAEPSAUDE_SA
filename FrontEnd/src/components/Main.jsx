import { useState, useEffect } from "react";
import AtividadeCard from "./AtividadeCard";
import { listarAtividades, curtirAtividade } from "../services/api";

function Main({ usuario, onAbrirLogin, onLogout }) {
  const [atividades, setAtividades] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    listarAtividades({ tipo: filtroAtivo, pagina, usuario_id: usuario?.id })
      .then((dados) => {
        setAtividades(dados.atividades);
        setTotalPaginas(dados.totalPaginas);
      })
      .catch((erro) => console.error("Erro ao buscar atividades:", erro))
      .finally(() => setCarregando(false));
  }, [filtroAtivo, pagina, usuario]);

  function seLogado(acao) {
    return (...args) => {
      if (!usuario) {
        onAbrirLogin();
        return;
      }
      acao(...args);
    };
  }

  function selecionarFiltro(tipo) {
    setFiltroAtivo(tipo);
    setPagina(1);
  }

  async function handleCurtir(atividadeId) {
    const resultado = await curtirAtividade(atividadeId, usuario.id);
    setAtividades((atuais) =>
      atuais.map((a) =>
        a.id === atividadeId
          ? { ...a, curtidas: resultado.totalCurtidas, jaCurtiu: resultado.curtiu }
          : a
      )
    );
  }

  return (
    <main className="main">
      <header className="main-header">
        {usuario ? (
          <button className="botao-login" onClick={onLogout}>Logout</button>
        ) : (
          <button className="botao-login" onClick={onAbrirLogin}>Login</button>
        )}
      </header>

      <nav className="filtros">
        {["corrida", "caminhada", "trilha"].map((tipo) => (
          <button
            key={tipo}
            className={filtroAtivo === tipo ? "filtro ativo" : "filtro"}
            onClick={seLogado(() => selecionarFiltro(tipo))}
          >
            {tipo}
          </button>
        ))}
      </nav>

      <section className="lista-atividades">
        {carregando ? (
          <p>Carregando...</p>
        ) : (
          atividades.map((atividade) => (
            <AtividadeCard
              key={atividade.id}
              atividade={atividade}
              onCurtir={seLogado(() => handleCurtir(atividade.id))}
            />
          ))
        )}
      </section>

      <footer className="paginacao">
        <button disabled={pagina === 1} onClick={seLogado(() => setPagina((p) => p - 1))}>
          Anterior
        </button>
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
          <button
            key={numero}
            className={numero === pagina ? "pagina ativa" : "pagina"}
            onClick={seLogado(() => setPagina(numero))}
          >
            {numero}
          </button>
        ))}
        <button disabled={pagina === totalPaginas} onClick={seLogado(() => setPagina((p) => p + 1))}>
          Próximo
        </button>
      </footer>
    </main>
  );
}

export default Main;