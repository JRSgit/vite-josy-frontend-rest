// import { Link } from "react-router-dom"


const Footer = () => {
  const ano_atual = new Date().getFullYear()
  return (
    <div className='w-full h-20 bg-gray-50 flex flex-col items-center justify-center'>
      <p className='text-center text-gray-600'>Todos os direitos resevados ©JRSProg {ano_atual}</p>
      {/* <Link className="text-blue-400 border-b border-blue-500 text-sm" to='/cadastro'>Cadastar usuário</Link> */}
    </div>
  )
}

export default Footer