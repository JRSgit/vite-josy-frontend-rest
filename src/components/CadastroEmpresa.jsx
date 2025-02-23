import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useForm } from "react-hook-form"


const CadastroEmpresa = () => {
  const { handlePostEmpresa } = useContext(AppContext)

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      telefone: '',
    }
  })

  const handleSavarEmpresa = (data) => {
    handlePostEmpresa(data)
    reset()
  }

  return (
    <div className="w-full ">
      <h1 className="text-3xl mb-3 text-gray-500 font-semibold">Cadastrar Empresa</h1>
      <form
        onSubmit={handleSubmit(handleSavarEmpresa)}
        className='flex flex-col gap-3 p-6 rounded-lg bg-white shadow-2xl'>
        <div className='flex flex-col'>
          <label className="text-md text-gray-500" htmlFor="name">Nome:</label>
          <input
            {...register('name', { required: 'Digite o nome da empresa' })}
            className="p-3 bg-gray-300 rounded-lg uppercase" type="text" placeholder='Nome da empresa' />
          {
            errors.name && <p className="text-orange-500 text-center">{errors.name.message}</p>
          }
        </div>
        <div className="flex flex-col">
          <label

            className="text-md text-gray-500" htmlFor="telefone">Telefone:</label>
          <input
            {...register('telefone')}
            className="p-3 bg-gray-300 rounded-lg" type="text" placeholder='Telefome da empresa' />
          {/* {
            errors.telefone && <p className="text-orange-500 text-center">{errors.telefone.message}</p>
          } */}
        </div>
        <button className="px-4 py-2 w-fit text-white bg-blue-500 rounded-lg">Cadastrar</button>
      </form>
    </div>
  )
}

export default CadastroEmpresa