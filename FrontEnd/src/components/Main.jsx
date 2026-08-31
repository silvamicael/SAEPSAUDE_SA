import { useState, useEffect } from "react";
import AtividadeCard from "./AtividadeCard";
import { listarAtividades } from "../services/api";

function Main() {
    const [atividades, setAtividades] = useState([]);
    const [filtroAtivo, setFiltroAtivo] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        setCarregando(true);
        listarAtividades({ tipo: filtroAtivo, pagina })
            .then((dados) => {
                setAtividades(dados.atividades);
                setTotalPaginas(dados.totalPaginas);
            })
            .catch((erro) => console.error("Erro ao buscar atividades:", erro))
            .finally(() => setCarregando(false));
    }, [filtroAtivo, pagina]);

    function selecionarFiltro(tipo) {
        setFiltroAtivo(tipo);
        setPagina(1);
    }

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
                        onClick={() => selecionarFiltro(tipo)}
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
                        <AtividadeCard key={atividade.id} atividade={atividade} />
                    ))
                )}
            </section>

            <footer className="paginacao">
                <button disabled={pagina === 1} onClick={() => setPagina((p) => p - 1)}>
                    Anterior
                </button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
                    <button
                        key={numero}
                        className={numero === pagina ? "pagina ativa" : "pagina"}
                        onClick={() => setPagina(numero)}
                    >
                        {numero}
                    </button>
                ))}
                <button disabled={pagina === totalPaginas} onClick={() => setPagina((p) => p + 1)}>
                    Próximo
                </button>
            </footer>
        </main>
    );
}

export default Main;