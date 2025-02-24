import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

import ReportButton from "./ReportButton";

// const items = [
//   { id: 1, refeicao: "Café", quantidade: 40, status: "Entregue", data: "2025-02-13" },
//   { id: 2, refeicao: "Almoço", quantidade: 43, status: "Entregue", data: "2025-02-12" },
//   { id: 3, refeicao: "Janta", quantidade: 10, status: "Entregue", data: "2025-02-12" },
//   { id: 4, refeicao: "Café", quantidade: 40, status: "Entregue", data: "2025-02-12" },
//   { id: 5, refeicao: "Almoço", quantidade: 45, status: "Entregue", data: "2025-02-12" },
//   { id: 6, refeicao: "Café", quantidade: 40, status: "Entregue", data: "2025-02-12" },
//   { id: 7, refeicao: "Almoço", quantidade: 43, status: "Cancelado", data: "2025-02-12" },
//   { id: 8, refeicao: "Janta", quantidade: 10, status: "Entregue", data: "2025-02-12" },
//   { id: 9, refeicao: "Café", quantidade: 40, status: "Entregue", data: "2025-02-13" },
//   { id: 10, refeicao: "Almoço", quantidade: 45, status: "Cancelado", data: "2025-02-13" },
// ];

export default function TabelaRefeicoes() {
  const { handleGetItems, handleUpdateItem, items } = useContext(AppContext)
  const { slug } = useParams()

  const [total, setTotal] = useState()
  const [dados, setDados] = useState([])

  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    refeicao: "",
    status: "",
  });

  useEffect(() => {
    const resp = handleGetItems(slug)
    setDados(() => resp.slice().reverse())
  }, [items])

  useEffect(() => {
    calculaTotal()
  }, [dados, filtros])


  const handleChangeStatus = async (id, novoStatus) => {
    const resp = await handleUpdateItem(id, novoStatus)
    if (!resp) {
      return
    }

    const novosDados = dados.map(item =>
      item.id === id ? { ...item, status: novoStatus } : item
    );
    setDados(() => novosDados.slice().reverse());

  };

  const calculaTotal = () => {
    const todosItems = filtrarItems();
    const calculo = todosItems.reduce((acc, item) => acc + parseInt(item.quantidade), 0)
    setTotal(calculo)
  }

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
    <div className="md:p-6 w-full mx-auto">

      <ReportButton data={filtrarItems()} />

      {/* Filtros */}
      <div className="flex flex-wrap max-sm:flex-col items-center gap-4 mb-6 justify-between w-full bg-white shadow-2xl rounded-md p-4">
        <div className="flex flex-col max-sm:flex-col items-center gap-4 w-full">
          <h3 className="text-xl font-semibold text-center text-blue-500">Filtrar</h3>
          <div className="w-full flex flex-wrap justify-around gap-4">
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

        </div>

        <div className="flex gap-2 ml-8 items-center justify-end">
          <h2 className="text-xl text-blue-500 font-semibold">Total:</h2>
          <span className="border-b-2 border-amber-700 text-md px-3 py-1 rounded-md text-white bg-orange-400">{total}</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Tabela de Refeições</h2>


      {/* Tabela */}
      <table className="w-full table rounded-md overflow-hidden shadow-2xl">
        <thead>
          <tr className="bg-gray-200">
            <th className=" max-sm:hidden p-2">ID</th>
            <th className=" p-2">Refeição</th>
            <th className=" p-2">Quantidade</th>
            <th className=" p-2">Status</th>
            <th className=" p-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {filtrarItems().map((item, i) => (
            <tr key={item.id} className={`text-center ${i % 2 === 1 ? 'bg-gray-200' : ''}`}>
              <td className="max-sm:hidden p-2">{i}</td>
              <td className=" p-2">{item.refeicao}</td>
              <td className=" p-2">{item.quantidade}</td>
              <td className=" p-2">{item.status}</td>
              <td className=" p-2 ">
                <select value={item.status} onChange={e => handleChangeStatus(item.id, e.target.value)} className="p-1 cursor-pointer">
                  <option value="Entregue">Entregue</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
