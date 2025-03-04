import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Login = () => {
  const navigate = useNavigate()

  const { handlePostUserSession, handleIfLogin, loading, login } = useContext(AppContext)
  const { register, handleSubmit, } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const handleSubmitLogin = async (data) => {
    handlePostUserSession(data)
    // handleSetLogin(true)
  }

  useEffect(() => {
    navigate('/')
  }, [])

  useEffect(() => {
    handleIfLogin()
  }, [])

  return (
    <div className='w-full md:p-0 px-4 h-screen flex flex-col items-center justify-center '>
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-6xl text-orange-500 font-bold leading-2">Josy</h1>
        <h3 className="text-orange-400 text-2xl leading-3 mt-5 font-semibold">Restaurante</h3>
      </div>
      <div className='md:w-1/3 sm:w-1/2 w-full bg-white rounded-xl shadow-2xl p-6'>
        <h1 className='text-3xl text-gray-500 font-bold leading-1'>Login</h1>
        <form onSubmit={handleSubmit(handleSubmitLogin)} className="p-2 mt-6 flex flex-col gap-3" action="">
          <div className='flex flex-col'>
            <label className='text-gray-500' htmlFor="email">Email:</label>
            <input
              {...register('email')}
              className='p-2 rounded-md bg-gray-400 outline-none border-none'
              type="text" placeholder='Digite seu email'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-500' htmlFor="password">Senha:</label>
            <input
              {...register('password')}
              className='p-2 rounded-md bg-gray-400 outline-none border-none'
              type="password"
              placeholder='Digite sua senha'
            />
          </div>
          {
            loading ? (
              <Loading />
            ) : (
              <input
                className='bg-blue-500 w-fit text-xl font-bold text-white hover:bg-blue-600 transition-all rounded-lg px-4 py-2 cursor-pointer'
                type="submit"
                value={"Entrar"}
              />

            )
          }
        </form>
      </div>
    </div>
  )
}

export default Login