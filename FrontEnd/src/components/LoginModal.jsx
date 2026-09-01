import { useState } from "react";
import { login } from "../services/api";

function LoginModal({ onFechar, onLoginSucesso }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);

  async function handleLogin() {
    if (!email || !senha) {
      setErro("email ou senha obrigatório");
      return;
    }

    const { status, dados } = await login(email, senha);

    if (status !== 200) {
      setErro(dados.mensagem);
      return;
    }

    onLoginSucesso(dados);
  }

  return (
    <div className="modal-fundo">
      <div className="modal-login">
        <div className="modal-cabecalho">
          <h2>Login</h2>
          <button className="botao-fechar" onClick={onFechar}>
            <img src="/icons/x.svg" alt="Fechar" />
          </button>
        </div>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={erro ? "input-erro" : ""}
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={erro ? "input-erro" : ""}
        />

        {erro && <p className="mensagem-erro">{erro}</p>}

        <div className="modal-botoes">
          <button className="botao-cancelar" onClick={onFechar}>Cancelar</button>
          <button className="botao-confirmar" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;