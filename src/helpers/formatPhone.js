export function formatPhone(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/); // Quebra o número em grupos: (XX) XXXXX-XXXX
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber; // Retorna o número original se não corresponder ao formato esperado
}
