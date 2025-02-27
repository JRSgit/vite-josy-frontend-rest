/* eslint-disable react/prop-types */
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { AppContext } from "../context/AppContext"

const EditItem = ({ item, setIsOpen }) => {
  const { handleUpdateItem } = useContext(AppContext)
  const { register, handleSubmit } = useForm()


  const handleEditItem = async (data) => {
    data.quantidade = parseInt(data.quantidade)
    handleUpdateItem(item.id, data)
    setIsOpen(false)
  }

  return (
    <div className=' absolute top-full left-0 w-full min-h-dvh z-50 flex bg-black/50 items-center justify-center'>
      <dialog open className='w-fit md:w-1/2 flex flex-col  justify-center m-auto bg-white shadow-2xl p-2'>
        <div className="flex justify-between items-center">
          <h1
            className="text-xl text-gray-500 font-bold pl-4">
            Editando o Item {item.refeicao}
          </h1>
          <span
            onClick={() => setIsOpen(false)}
            className="text-red-500 text-2xl flex items-center justify-center cursor-pointer w-10 h-10 rounded-full transition-all hover:bg-red-200">x</span>

        </div>
        <form onSubmit={handleSubmit(handleEditItem)} className="p-4 items-center flex flex-col gap-3" action="">
          <div className='flex flex-col p-2 w-fit bg-gray-100 rounded-md'>
            <label htmlFor="">status:</label>
            <select
              name='status'
              {...register('status')}
              className="bg-gray-200 p-1 text-sm w-fit" defaultValue={item.status} >
              <option value="Entregue">Entregue</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className='flex flex-col p-2 bg-gray-100 rounded-md w-fit'>
            <label htmlFor="">Qtd:</label>
            <input
              {...register('quantidade')}
              className="bg-gray-200 p-1 text-sm w-[100px]"
              type="number" min={1} defaultValue={item.quantidade} />
          </div>

          <div className='flex flex-col p-2 bg-gray-100 rounded-md w-fit'>
            <label htmlFor="">data:</label>
            <input
              {...register('data')}
              className="bg-gray-200 p-1 text-sm w-fit"
              defaultValue={item.data} type="date" />
          </div>

          <input className="px-4 py-1 bg-orange-400 text-white font-semibold rounded-md cursor-pointer hover:bg-orange-500 transition-all" type="submit" value={'Editar'} />
        </form>

      </dialog>
    </div>
  )
}

export default EditItem