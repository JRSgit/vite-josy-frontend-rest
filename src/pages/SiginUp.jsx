import { useContext } from "react"
import { useForm } from "react-hook-form"
import { AppContext } from "../context/AppContext"
import { Link } from "react-router-dom"


const SiginUp = () => {
  const { handlePostUser } = useContext(AppContext)
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const handleSubmitSiginUp = async (data) => {
    handlePostUser(data)
    // console.log(data)
    reset()
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-6xl text-orange-500 font-bold leading-2">Josy</h1>
        <h3 className="text-orange-400 text-2xl leading-3 mt-5 font-semibold">Restaurante</h3>
      </div>

      <div className="bg-white shadow-2xl rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-500 p-3">Cadastro</h1>
        <form
          onSubmit={handleSubmit(handleSubmitSiginUp)}
          className="flex flex-col p-4 w-full"
          action="">
          <div className="flex flex-col gap-1 p-2">
            <label className="text-gray-400" htmlFor="name">Nome:</label>
            <input
              {...register('name', { required: 'Digite um nome' })}
              name="name"
              className="p-2 rounded-md bg-gray-100 border-none outline-none text-lg"
              type="text" placeholder="Digite seu nome"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-1 p-2">
            <label className="text-gray-400" htmlFor="enail">Email:</label>
            <input
              {...register('email', { required: 'Digete um email' })}
              name="email"
              className="p-2 rounded-md bg-gray-100 border-none outline-none text-lg"
              type="email" placeholder="Digite seu melhor email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-1 p-2">
            <label className="text-gray-400" htmlFor="password">Senha:</label>
            <input
              {...register('password', { required: 'Digite uma senha forte' })}
              name="password" min={6}
              className="p-2 rounded-md bg-gray-100 border-none outline-none text-lg"
              type="password" placeholder="Digite uma senha forte"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <input
            className="px-4 py-2 w-fit rounded-md cursor-pointer text-xl mt-6 bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all"
            type="submit" value={"Cadastrar"} />
        </form>
        <Link className="text-blue-500 float-right" to='/'>Home</Link>
      </div>
    </div>
  )
}

export default SiginUp