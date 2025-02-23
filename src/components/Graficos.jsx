/* eslint-disable react/prop-types */
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calcularQuantidades, sumDailyQuantities } from './CalculaSemanaMes';



const cores = {
  Entregue: "#4CAF50",
  Cancelado: "#F44336",
  Pendente: "#FFC107",
};



// Componente para Gráfico de Barras (Última Semana)
export const GraficoBarras = ({ dados }) => {
  const arrayDay = sumDailyQuantities(dados)


  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={arrayDay}>
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantidade" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Componente para Gráfico de Linhas (Evolução Mensal)
export const GraficoLinhas = ({ dados }) => {
  const { semanasArray } = calcularQuantidades(dados)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={semanasArray}>
        <XAxis dataKey="Semana" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="quantidade" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Componente para Gráfico de Pizza (Distribuição Total)
export const GraficoPizza = ({ dados }) => {
  const totais = dados.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + item.quantidade;
    return acc;
  }, {});

  const dataFormatada = Object.entries(totais).map(([status, quantidade]) => ({
    name: status,
    value: quantidade,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={dataFormatada} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
          {dataFormatada.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={cores[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
