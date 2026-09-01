const BASE_URL = "http://localhost:3000";

export async function listarAtividades({ tipo, pagina = 1, usuario_id, minhas } = {}) {
  const params = new URLSearchParams();
  if (tipo) params.append("tipo", tipo);
  params.append("pagina", pagina);
  if (usuario_id) params.append("usuario_id", usuario_id);
  if (minhas) params.append("minhas", "true");

  const resposta = await fetch(`${BASE_URL}/atividades?${params.toString()}`);
  return resposta.json();
}

export async function login(email, senha) {
  const resposta = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  return { status: resposta.status, dados: await resposta.json() };
}

export async function curtirAtividade(atividadeId, usuarioId) {
  const resposta = await fetch(`${BASE_URL}/atividades/${atividadeId}/curtir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario_id: usuarioId }),
  });
  return resposta.json();
}

export async function getPerfil(usuarioId) {
  const params = usuarioId ? `?usuario_id=${usuarioId}` : "";
  const resposta = await fetch(`${BASE_URL}/perfil${params}`);
  return resposta.json();
}