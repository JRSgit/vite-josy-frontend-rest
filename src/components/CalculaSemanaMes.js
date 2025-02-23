import { parseISO, getWeekOfMonth, format, isSameWeek } from 'date-fns';
import { ptBR } from "date-fns/locale";

// const dados = [
//   // Seu array de dados aqui...
// ];

export const calcularQuantidades = (dados) => {
  const semanas = {};
  const meses = {};

  dados.forEach(({ data, quantidade }) => {
    const dataFormatada = parseISO(data);
    const semana = getWeekOfMonth(dataFormatada);
    const mes = format(dataFormatada, 'MMMM'); // Nome do mês

    // Soma por semana dentro do mês atual
    if (!semanas[semana]) {
      semanas[semana] = 0;
    }
    semanas[semana] += quantidade;

    // Soma por mês
    if (!meses[mes]) {
      meses[mes] = 0;
    }
    meses[mes] += quantidade;
  });

  // Converte os objetos em arrays formatados
  const semanasArray = Object.entries(semanas).map(([semana, total]) => ({ [`Semana ${semana}`]: total }));
  const mesesArray = Object.entries(meses).map(([mes, total]) => ({ [mes]: total }));

  return { semanasArray, mesesArray };
};

// const { semanasArray, mesesArray } = calcularQuantidades(dados);
// console.log('Semanas:', semanasArray);
// console.log('Meses:', mesesArray);



export const sumDailyQuantities = (data) => {
  const hoje = new Date();
  // const diasSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

  const dailyTotals = data.reduce((acc, item) => {
    const itemDate = parseISO(item.data);

    if (isSameWeek(itemDate, hoje, { weekStartsOn: 0 })) {
      const diaSemana = format(itemDate, "eeee", { locale: ptBR });

      acc[diaSemana] = (acc[diaSemana] || 0) + item.quantidade;
    }

    return acc;
  }, {});

  return Object.entries(dailyTotals).map(([dia, quantidade]) => ({
    dia,
    quantidade
  }));
}

// Exemplo de uso:
// const resultado = sumDailyQuantities(dados);
// console.log(resultado);


// Exemplo de uso
// const result = sumDailyQuantities(dados);
// console.log(result);
