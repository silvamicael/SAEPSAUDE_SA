function Perfil() {
    return (
        <aside className="perfil">
            <div className="perfil-topo">
                <img src="/SAEPSaude.png" alt="Logo SAEPSaúde" className="perfil-logo" />
                <h2 className="perfil-nome">SAEPSaúde</h2>

                <div className="perfil-stats">
                    <div>
                        <strong>3</strong>
                        <span>Qtd. Atividades</span>
                    </div>
                    <div>
                        <strong>100</strong>
                        <span>Qtd. Calorias</span>
                    </div>
                </div>

                <button className="botao-atividade" disabled>
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