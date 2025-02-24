import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import CadastroEmpresa from "../components/CadastroEmpresa"
import Layout from "../components/Layout"

import { FaTrash } from 'react-icons/fa'


const Empresas = () => {
  const { empresas, handleDeleteEmpresa } = useContext(AppContext)

  const handleButtonDelete = async (id, name) => {
    const isDelete = confirm(`Deseja deletar a empresa ${name}?`)
    if (!isDelete) {
      return
    }

    handleDeleteEmpresa(id)
  }
  return (
    <Layout>
      <h1 className="text-gray-400 text-xl md:text-3xl font-bold md:pl-4 pl-2 mt-10 md:mb-10">
        Empresas Cadastradas
      </h1>
      <div className=" items-center m-auto grid md:grid-cols-2 gap-8 md:w-2/3 p-4 ">
        <ul className="flex flex-wrap gap-3 md:flex-col bg-white rounded-md shadow-2xl p-2 md:p-4">
          {
            empresas && empresas.map((empresa) => (
              <li

                className="flex max-sm:flex-col max-sm:gap-3 md:text-md text-sm uppercase justify-between items-center bg-gray-100 mb-4 rounded-md md:p-2 px-2 py-1" key={empresa.id}>
                {empresa.name}
                <FaTrash
                  onClick={() => handleButtonDelete(empresa.id, empresa.name)}
                  size={20} color="red" className="cursor-pointer" />
                {/* <button
                  onClick={() => handleButtonDelete(empresa.id, empresa.name)}
                  className="md:p-2 p-1 text-sm md:text-md bg-red-700 cursor-pointer hover:bg-red-500 transition-all text-white rounded-2xl">
                    Apagar
                </button> */}
              </li>
            ))
          }
        </ul>
        <div className="p-4 h-screen">
          <CadastroEmpresa />
        </div>
      </div>

    </Layout>
  )
}

export default Empresas