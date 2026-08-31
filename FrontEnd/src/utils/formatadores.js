export function formatarData(timestamp) {
  const data = new Date(timestamp);
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = String(data.getFullYear()).slice(-2);
  return `${hora}:${minuto} - ${dia}/${mes}/${ano}`;
}