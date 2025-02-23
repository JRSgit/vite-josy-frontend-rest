import { useContext, useState } from 'react'

import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { v4 as uuidV4 } from 'uuid'
import { format } from 'date-fns'

const FormServico = () => {
  const { handlePostEntregas } = useContext(AppContext)
  const { slug } = useParams()
  const dataInput = format(new Date().toString(), 'yyyy-MM-dd')

  const [data_atual, setData_atual] = useState(() => format(new Date().toISOString(), 'yyyy-MM-dd'))

  // console.log(data_atual,)

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      refeicao: '',
      quantidade: 1,
      status: '',
      dataTime: data_atual || '',
      empresa: slug || ''
    }
  })

  const handleSubmitAddPedido = async (data) => {
    // data.id = uuidV4()
    // handleSetItems(data)
    handlePostEntregas(data)
    // console.log(data)
    reset()
  }


  return (
    <div className="w-full h-fit bg-white rounded-md shadow-2xl px-4 py-2">
      <h1 className="text-2xl font-bold text-gray-500">Adicionar Entrega</h1>
      <form
        onSubmit={handleSubmit(handleSubmitAddPedido)}
        className='flex w-full  flex-col p-2 ' >
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-clos-1 justify-between p-2 gap-4">

          <div className='p-4 flex flex-1 flex-col bg-gray-100 rounded-md'>
            <label className="text-gray-400" htmlFor="refeicao">Refeição:</label>
            <select
              {...register('refeicao', { required: 'Selecione o tipo de refeição' })}
              className="p-2 bg-gray-300 rounded-md" name="refeicao" id="refeicao">
              <option className="text-sm md:text-base" value="">Selecione a refeição</option>
              <option value="Café">Café</option>
              <option value="Almoço">Almoço</option>
              <option value="Janta">Janta</option>
            </select>
            {errors.refeicao && <span className='text-orange-500'>{errors.refeicao.message}</span>}
          </div>
          <div className='p-4 flex-1 flex flex-col bg-gray-100 rounded-md'>
            <label className="text-gray-400" htmlFor="quantidade">Quantidade:</label>
            <input
              {...register('quantidade', { required: 'Digite a quantidade' })}
              className="p-2 bg-gray-300 rounded-md" type="number" min={0}
            />
            {errors.quantidade && <span className='text-orange-500'>{errors.quantidade.message}</span>}
          </div>
          <div className='p-4 flex-1 flex flex-col bg-gray-100 rounded-md'>
            <label className="text-gray-400" htmlFor="status">Status:</label>
            <select
              {...register('status', { required: 'Selecione o status' })}
              className="p-2 bg-gray-300 rounded-md" name="status" id="status">
              <option className="text-sm md:text-base" value="">Selecione um status</option>
              <option value="Entregue">Entregue</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelado">Cancelado</option>
            </select>
            {errors.status && <span className='text-orange-500'>{errors.status.message}</span>}
          </div>
          <div className='p-4 flex-1 flex flex-col bg-gray-100 rounded-md'>
            <label className="text-gray-400" htmlFor="dataTime">Data:</label>
            <input
              name='dataTime'
              defaultValue={dataInput}
              value={data_atual}
              onChange={(e) => setData_atual(e.target.value)}
              // {...register('dataTime')}
              className="p-2 bg-gray-300 rounded-md" type="date"
            />
            {errors.dataTime && <span className='text-orange-500'>{errors.dataTime.message}</span>}
          </div>
        </div>

        <input type="submit" value="Adicionar"
          className="px-4 w-fit py-2 rounded-md bg bg-blue-500 text-white font-bold cursor-pointer"
        />
      </form>
    </div>
  )
}

export default FormServico