/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'

import { AppContext } from '../context/AppContext'
import Layout from '../components/Layout'

const Table = ({ data }) => {
  const [valorTotal, setValorTotal] = useState(0)
  const [valor, setValor] = useState(0)

  const calcularValor = (data) => {
    const quantidade = data.reduce((acc, item) => acc + parseInt(item.quantidade), 0)
    const valor_total = quantidade * valor;


    setValorTotal(valor_total)
  }
  return (
    <div className='bg-white shadow-2xl p-4'>
      <table className='table w-full'>
        <thead>
          <tr className='text-center bg-gray-200'>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Refeição</th>
            <th className='p-2'>Qauntidade</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.map((item, i) => (
              <tr className='text-center' key={i}>
                <td>{item.empresa}</td>
                <td>{item.refeicao}</td>
                <td>{item.quantidade}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='flex flex-col w-full items-center gap-3  mt-8'>
        <div className='flex flex-col items-center bg-gray-50 p-2 rounded-md'>
          <label htmlFor="valor">Digite um valor:</label>
          <input
            className='bg-gray-200 p-2 w-fit'
            onChange={(e) => setValor(e.target.value)} type="number" min={0} />
        </div>
        <div className='flex justify-between w-full items-center bg-gray-50 p-2 rounded-md'>
          <div className='flex items-center gap-2'>
            <h1 className='text-xl text-blue-500 font-bold '>Total R$:</h1>
            <span>{valorTotal}</span>
          </div>
          <button
            onClick={() => calcularValor(data)}
            className='px-4 py-2 bg-blue-500 rounded-md'>
            Calcular
          </button>

        </div>
      </div>

    </div>
  )
}

const Entregas = () => {
  const { items } = useContext(AppContext)

  const [itemFiltrado, setItemFiltrado] = useState()

  const [cafe, setCafe] = useState()
  const [almoco, setAlmoco] = useState()
  const [janta, setJanta] = useState()
  const [empresas, setEmpresas] = useState()

  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    refeicao: "",
    status: "",
  });


  useEffect(() => {
    const empesa = items.map((item) => item.empresa)
    const empresaUnicas = [...new Set(empesa)]
    setEmpresas(empresaUnicas)
  }, [items])

  useEffect(() => {
    filtrarItems()
  }, [filtros])


  const filtrarItems = () => {
    const fliter = items.filter((item) => {
      const dentroPeriodo =
        (!filtros.dataInicio || item.data >= filtros.dataInicio) &&
        (!filtros.dataFim || item.data <= filtros.dataFim);
      return dentroPeriodo;
    });
    setItemFiltrado(fliter)
  };



  const empresaFiltrarItems = (emp) => {
    const cafe = itemFiltrado.filter((item) => item.refeicao === 'Café' && item.empresa === emp)
    const almoco = itemFiltrado.filter((item) => item.refeicao === 'Almoço' && item.empresa === emp)
    const janta = itemFiltrado.filter((item) => item.refeicao === 'Janta' && item.empresa === emp)

    setCafe(cafe)
    setAlmoco(almoco)
    setJanta(janta)
  }




  return (
    <Layout >
      <div className='w-full min-h-screen'>
        {/* Filtro */}
        <div className='flex  max-sm:flex-col md:ml-6 gap-4 p-4 bg-white shadow-2xl mt-8 md:w-fit w-full rounded-md'>
          <h3 className="text-lg font-semibold text-center text-blue-500">Defina o periodo</h3>
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
        </div>
        {/* ======================================================= */}

        <div className='flex flex-col mt-8 px-6 mb-10'>
          <h1 className='text-xl font-bold mb-3'>Escolha a Empresa</h1>
          <div className='flex flex-wrap gap-4'>
            {
              empresas && empresas.map((item) => (
                <button
                  onClick={() => empresaFiltrarItems(item)}
                  className='bg-gray-400 cursor-pointer px-3 py-1 rounded-md uppercase text-white' key={item}>{item}</button>
              ))
            }

          </div>
        </div>
        {/* ================================================================== */}

        <div className='grid md:grid-cols-3 grid-cols-1 gap-4 w-full p-6 '>
          {
            cafe &&
            <Table data={cafe} />
          }
          {
            almoco &&
            <Table data={almoco} />
          }
          {
            janta &&
            <Table data={janta} />
          }

        </div>

      </div>
    </Layout>
  )
}

export default Entregas