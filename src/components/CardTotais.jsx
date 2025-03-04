/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { calcularQuantidades, sumDailyQuantities } from './CalculaSemanaMes'

import { MdDinnerDining, MdOutlineFoodBank } from "react-icons/md"
import { FaCoffee, } from 'react-icons/fa'

import { format } from 'date-fns'


const ItemCard = ({ qtd, nome, color, periodo }) => {

  useEffect(() => {
    console.log(qtd)
  }, [qtd, nome])

  return (
    <div className='bg-white rounded-sm shadow-2xl md:p-3 p-1 flex gap-4 items-center justify-items-start'>
      {
        nome === 'Café' ? <FaCoffee className='' size={25} color={color} /> :
          nome === 'Almoço' ? <MdOutlineFoodBank size={25} color={color} /> :
            <MdDinnerDining size={25} color={color} />
      }
      <div className=''>
        <h2 className='text-gray-300 md:text-md text-sm font-semibold'>{periodo}</h2>
        <h1 className='md:text-xl text-sm font-bold text-blue-500'>{qtd}</h1>
        <h3 className='md:text-md text-sm font-medium text-gray-500'>{nome}</h3>
      </div>
    </div>
  )
}



const CardTotais = () => {
  const { cafe, janta, almoco } = useContext(AppContext)
  const [semanaAlmoco, setSemanaAlmoco] = useState()
  const [semanaJanta, setSemanaJanta] = useState()
  const [semanaCafe, setSemanaCafe] = useState()

  const [mesAtual] = useState(() => format(new Date(), 'MMMM'))

  const [mesAlmoco, setMesAlmoco] = useState()
  const [mesJanta, setMesJanta] = useState()
  const [mesCafe, setMesCafe] = useState()

  useEffect(() => {
    calculoTotaisSemanais(cafe, almoco, janta)

  }, [])


  const calculoTotaisSemanais = async (cafe, almoco, janta) => {
    console.log('Inicio da funcao')
    const cafesemana = sumDailyQuantities(cafe)
    const amolcosemana = sumDailyQuantities(almoco)
    const jantasemana = sumDailyQuantities(janta)

    console.log(cafesemana)
    const cafeTotal = cafesemana.reduce((acc, item) => acc + item.quantidade, 0)
    setSemanaCafe(cafeTotal)

    const almocoTotal = amolcosemana.reduce((acc, item) => acc + item.quantidade, 0)
    setSemanaAlmoco(almocoTotal)

    const jantaTotal = jantasemana.reduce((acc, item) => acc + item.quantidade, 0)
    setSemanaJanta(jantaTotal)

    const mesalmoco = calcularQuantidades(almoco)
    const mesjanta = calcularQuantidades(janta)
    const mescafe = calcularQuantidades(cafe)
    // Retorna o total de café entregue no mês
    const cTotalMes = mescafe.mesesArray.map((item) => item)
    const cafeInMes = cTotalMes.map((item) => item[mesAtual])
    setMesCafe(cafeInMes.pop())
    console.log(cafeInMes.pop())

    // Retorna o total de almoço entregue no mês
    const aTotalMes = mesalmoco.mesesArray.map((item) => item)
    const aInMes = aTotalMes.map((item) => item[mesAtual])
    setMesAlmoco(aInMes.pop())

    // Retorna o total de jantas entregue no mês
    const jTotalMes = mesjanta.mesesArray.map((item) => item)
    const jInMes = jTotalMes.map((item) => item[mesAtual])
    setMesJanta(jInMes.pop())

    console.log('fim da funcao')

  }

  return (
    <div className='grid md:grid-cols-6 grid-cols-2 sm:grid-cols-4 px-2 gap-4 mt-5'>

      <ItemCard qtd={semanaCafe} nome="Café" periodo='Na Semana' color='green' />
      <ItemCard qtd={semanaAlmoco} nome="Almoço" periodo='Na Semana' color='orange' />
      <ItemCard qtd={semanaJanta} nome="Janta" periodo='Na Semana' color='yellow' />

      <ItemCard qtd={mesCafe} nome="Café" periodo='No Mês' color='yellow' />
      <ItemCard qtd={mesAlmoco} nome="Almoço" periodo='No Mês' color='green' />
      <ItemCard qtd={mesJanta} nome="Janta" periodo='No Mês' color='orange' />



    </div>
  )
}

export default CardTotais