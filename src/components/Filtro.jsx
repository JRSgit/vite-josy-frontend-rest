/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'

const Filtro = ({ dados }) => {
  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    refeicao: "",
    status: "",
  });


  const filtrarItems = () => {
    return dados.filter((item) => {
      const dentroPeriodo =
        (!filtros.dataInicio || item.data >= filtros.dataInicio) &&
        (!filtros.dataFim || item.data <= filtros.dataFim);
      const filtroRefeicao = !filtros.refeicao || item.refeicao === filtros.refeicao;
      const filtroStatus = !filtros.status || item.status === filtros.status;
      return dentroPeriodo && filtroRefeicao && filtroStatus;
    });
  };


  return (
    <div>
      <h3 className="text-lg font-semibold text-center text-blue-500">Filtrar</h3>
      <input
        type="date"
        value={filtros.dataInicio}
        onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
        className="border p-2 rounded-md"
      />
      <input
        type="date"
        value={filtros.dataFim}
        onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
        className="border p-2 rounded-md"
      />
      <select
        value={filtros.refeicao}
        onChange={(e) => setFiltros({ ...filtros, refeicao: e.target.value })}
        className="border p-2 rounded-md"
      >
        <option value="">Todas as Refeições</option>
        <option value="Café">Café</option>
        <option value="Almoço">Almoço</option>
        <option value="Janta">Janta</option>
      </select>
      <select
        value={filtros.status}
        onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
        className="border p-2 rounded-md"
      >
        <option value="">Todos os Status</option>
        <option value="Entregue">Entregue</option>
        <option value="Pendente">Pendente</option>
        <option value="Cancelado">Cancelado</option>
      </select>
    </div>
  )
}

export default Filtro