export function formatedUTCDate(data) {
  const date = new Date(data);
  const options = { timeZone: "America/Sao_Paulo", hour12: false };
  const brazilDate = date.toLocaleDateString("pt-BR", options);
  return brazilDate;
}
export function formatedUTCTime(data) {
  const date = new Date(data);
  const options = { timeZone: "America/Sao_Paulo", hour12: false };
  const brazilTime = date.toLocaleTimeString("pt-BR", options);
  return brazilTime;
}
