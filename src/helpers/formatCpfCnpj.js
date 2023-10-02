export function formatCpfCnpj(cpfOrCnpj) {
  if (!cpfOrCnpj) {
    return "";
  }

  const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;

  let formattedValue = cpfOrCnpj.replace(/[^\d]+/g, "");

  if (formattedValue.length === 11) {
    formattedValue = formattedValue.replace(cpfRegex, "$1.$2.$3-$4");
  } else if (formattedValue.length === 14) {
    formattedValue = formattedValue.replace(cnpjRegex, "$1.$2.$3/$4-$5");
  } else {
    // Não é um CPF nem CNPJ válido
    return cpfOrCnpj;
  }

  return formattedValue;
}
