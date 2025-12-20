 // Função que pega a data de Hoje
  export function dataHoje() {
    const hoje = new Date();

    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const ano = hoje.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }