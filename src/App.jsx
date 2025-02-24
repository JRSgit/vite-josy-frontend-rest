/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react'
import { format } from 'date-fns'

import './App.css'

import { GraficoBarras, GraficoLinhas, GraficoPizza } from './components/Graficos'
import CadastroEmpresa from './components/CadastroEmpresa'
import EmpresaCadastrada from './components/EmpresaCadastrada '
import UltimasEntregas from './components/UltimasEntregas'
import { AppContext } from './context/AppContext'
import Layout from './components/Layout'
// import { calcularQuantidades, sumDailyQuantities } from './components/CalculaSemanaMes'

function App() {
  const { items } = useContext(AppContext)
  const [data_atual,] = useState(() => format(new Date(), 'yyyy-MM-dd'))

  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    refeicao: "",
    status: "",
  });


  const filtrarItems = () => {
    return items.filter((item) => {
      const dentroPeriodo =
        (!filtros.dataInicio || item.data >= filtros.dataInicio) &&
        (!filtros.dataFim || item.data <= filtros.dataFim);
      const filtroRefeicao = !filtros.refeicao || item.refeicao === filtros.refeicao;
      const filtroStatus = !filtros.status || item.status === filtros.status;
      return dentroPeriodo && filtroRefeicao && filtroStatus;
    });
  };

  return (
    <Layout>
      <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 w-full gap-4 px-6 mt-10'>
        <CadastroEmpresa />
        <EmpresaCadastrada />
        <UltimasEntregas />
      </div>

      <div className='  flex max-sm:flex-col md:ml-6 gap-4 p-4 bg-white shadow-2xl mt-8 w-full md:w-fit rounded-md'>
        <h3 className="md:text-xl text-lg  font-semibold text-center text-blue-500">
          Filtrar
        </h3>
        <div className=' flex  flex-wrap items-center justify-around gap-4'>
          <input
            type="date"
            value={filtros.dataInicio}
            onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
            className="border p-2 rounded-md w-fit"
          />
          <input
            type="date"
            value={filtros.dataFim || data_atual}
            onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
            className="border p-2 rounded-md w-fit"
          />
          <select
            value={filtros.refeicao}
            onChange={(e) => setFiltros({ ...filtros, refeicao: e.target.value })}
            className="border p-2 rounded-md w-fit"
          >
            <option value="">Todas as Refeições</option>
            <option value="Café">Café</option>
            <option value="Almoço">Almoço</option>
            <option value="Janta">Janta</option>
          </select>
          <select
            value={filtros.status}
            onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
            className="border p-2 rounded-md w-fit"
          >
            <option value="">Todos os Status</option>
            <option value="Entregue">Entregue</option>
            <option value="Pendente">Pendente</option>
            <option value="Cancelado">Cancelado</option>
          </select>

        </div>
      </div>

      <h1 className='text-xl font-bold p-6'>Relatório em Graficos</h1>
      <div className='grid md:grid-cols-2 grid-cols-1 mt-10 px-6 mb-10'>
        <GraficoBarras dados={filtrarItems()} />
        {/* <GraficoLinhas dados={filtrarItems()} /> */}
        <GraficoPizza dados={filtrarItems()} />
      </div>

    </Layout>
  )
}

export default App
