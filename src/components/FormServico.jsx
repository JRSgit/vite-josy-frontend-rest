import { useContext, useState } from 'react'

import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const FormServico = () => {
  const { handlePostEntregas } = useContext(AppContext)
  const { slug } = useParams()


  const [data_atual, setData_atual] = useState()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      refeicao: '',
      quantidade: 1,
      status: 'Entregue',
      dataTime: data_atual || '',
      empresa: slug || ''
    }
  })

  const handleSubmitAddPedido = async (data) => {
    // data.id = uuidV4()
    // handleSetItems(data)
    handlePostEntregas(data)
    // reset()
  }


  return (
    <div className="w-full h-fit bg-white rounded-md shadow-2xl md:px-4 px-2 py-1 md:py-2">
      <h1 className="md:text-2xl text-[22px] font-bold text-gray-500 mb-5 pl-2 mt-4">
        Adicionar Entrega
      </h1>
      <form
        onSubmit={handleSubmit(handleSubmitAddPedido)}
        className='flex flex-col gap-3 w-full  md:flex-col md:p-2 p-1'
      >

        <div className="md:grid md:grid-cols-4 sm:grid-cols-2 flex flex-wrap justify-around gap-3  md:p-2 md:gap-4 ">

          <div className='md:p-4 p-2 flex w-fit flex-col bg-gray-100 rounded-md'>
            <label className="text-gray-400 text-[16px]" htmlFor="refeicao">Refeição:</label>
            <select
              {...register('refeicao', { required: 'Selecione o tipo de refeição' })}
              className="md:p-2 p-1 w-fit bg-gray-300 rounded-md" name="refeicao" id="refeicao">
              <option className="text-sm md:text-base" value="">Selecione a refeição</option>
              <option className='text-sm md:text-md' value="Café">Café</option>
              <option className='text-sm md:text-md' value="Almoço">Almoço</option>
              <option className='text-sm md:text-md' value="Janta">Janta</option>
            </select>
            {errors.refeicao && <span className='text-orange-500'>{errors.refeicao.message}</span>}
          </div>

          <div className='md:p-4 p-2 w-fit flex flex-col bg-gray-100 rounded-md'>
            <label className="text-gray-400 text-[16px]" htmlFor="quantidade">Quant.:</label>
            <input
              {...register('quantidade', { required: 'Digite a quantidade' })}
              className="md:p-2 p-1 md:w-[170px] w-[60px] bg-gray-300 rounded-md" type="number" min={0}
            />
            {errors.quantidade && <span className='text-orange-500'>{errors.quantidade.message}</span>}
          </div>

          <div className='md:p-4 p-2 w-fit flex flex-col bg-gray-100 rounded-md'>
            <label className="text-gray-400 md:text-md text-[16px]" htmlFor="status">Status:</label>
            <select
              {...register('status', { required: 'Selecione o status' })}
              className="p-2 bg-gray-300 rounded-md" name="status" id="status">
              <option selected={true} className='text-sm md:text-md' value="Entregue">Entregue</option>
              <option className='text-sm md:text-md' value="Pendente">Pendente</option>
              <option className='text-sm md:text-md' value="Cancelado">Cancelado</option>
            </select>
            {errors.status && <span className='text-orange-500'>{errors.status.message}</span>}
          </div>
          <div className='md:p-4 p-2 w-fit flex flex-col bg-gray-100 rounded-md'>
            <label className="text-gray-400 text-sm md:text-md" htmlFor="dataTime">Data:</label>
            <input
              name='dataTime'
              onChange={(e) => setData_atual(e.target.value)}
              {...register('dataTime')}
              className="p-2 bg-gray-300 rounded-md" type="date"
            />
            {errors.dataTime && <span className='text-orange-500'>{errors.dataTime.message}</span>}
          </div>
        </div>

        <input
          type="submit" value="Adicionar"
          className="md:px-4 w-fit md:py-2 px-2 py-1 mt-2 mb-4 rounded-md bg bg-blue-500 text-white font-bold cursor-pointer"
        />
      </form>
    </div>
  )
}

export default FormServico