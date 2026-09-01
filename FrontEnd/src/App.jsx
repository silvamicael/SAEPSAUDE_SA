import { useState } from "react";
import Perfil from "./components/Perfil";
import Main from "./components/Main";
import LoginModal from "./components/LoginModal";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  function handleLoginSucesso(dadosUsuario) {
    setUsuario(dadosUsuario);
    setMostrarLogin(false);
  }

  return (
    <div className="app-container">
      <Perfil usuario={usuario} />
      <Main
        usuario={usuario}
        onAbrirLogin={() => setMostrarLogin(true)}
        onLogout={() => setUsuario(null)}
      />
      {mostrarLogin && (
        <LoginModal
          onFechar={() => setMostrarLogin(false)}
          onLoginSucesso={handleLoginSucesso}
        />
      )}
    </div>
  );
}

export default App;