import { useState } from "react";
import AtividadeCard from "./AtividadeCard";

const atividadesMock = [
  {
    id: 1,
    tipo: "corrida",
    usuario: { nome: "Usuário_01", imagem: "/avatars/usuario01.jpg" },
    distancia: 10000,
    duracao: 50,
    calorias: 350,
    curtidas: 4,
    comentarios: 4,
    jaCurtiu: false,
  },
  {
    id: 2,
    tipo: "trilha",
    usuario: { nome: "Usuário_02", imagem: "/avatars/usuario02.jpg" },
    distancia: 10000,
    duracao: 50,
    calorias: 350,
    curtidas: 5,
    comentarios: 4,
    jaCurtiu: true,
  },
];

function Main() {
  const [filtroAtivo, setFiltroAtivo] = useState(null);

  return (
    <main className="main">
      <header className="main-header">
        <button className="botao-login">Login</button>
      </header>

      <nav className="filtros">
        {["corrida", "caminhada", "trilha"].map((tipo) => (
          <button
            key={tipo}
            className={filtroAtivo === tipo ? "filtro ativo" : "filtro"}
            onClick={() => setFiltroAtivo(tipo)}
          >
            {tipo}
          </button>
        ))}
      </nav>

      <section className="lista-atividades">
        {atividadesMock.map((atividade) => (
          <AtividadeCard key={atividade.id} atividade={atividade} />
        ))}
      </section>

      <footer className="paginacao">
        <button>Anterior</button>
        <button className="pagina ativa">1</button>
        <button className="pagina">2</button>
        <button className="pagina">3</button>
        <button>Próximo</button>
      </footer>
    </main>
  );
}

export default Main;