import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const EmpresaCadastrada = () => {
  const { empresas } = useContext(AppContext)


  return (
    <div className="w-full ">
      <h1 className="text-2xl mb-3 text-gray-500 font-semibold">Empresas Cadatradas</h1>
      <ul className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg bg-white shadow-2xl">
        {
          empresas && empresas.map((empresa, i) => (
            <Link key={i}
              to={`/add_servico/${empresa.name.toLowerCase()}`}
              className="hover:bg-gray-300 lo  cursor-pointer uppercase transition-all w-full p-2 rounded- text-center rounded-lg">
              {empresa.name}
            </Link>
          ))
        }
      </ul>
    </div>
  )
}

export default EmpresaCadastrada


{/* <Link to='/add_servico/vca' className="hover:bg-gray-300 cursor-pointer transition-all w-full p-2 rounded- text-center rounded-lg">VCA</Link>
            <Link to='/add_servico/vog' className="hover:bg-gray-300 cursor-pointer transition-all w-full p-2 rounded- text-center rounded-lg">VOG</Link>
            <Link to='/add_servico/emabasa' className="hover:bg-gray-300 cursor-pointer transition-all w-full p-2 rounded- text-center rounded-lg">EMBASA</Link> */}