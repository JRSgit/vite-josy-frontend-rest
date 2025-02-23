import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import CadastroEmpresa from "../components/CadastroEmpresa"
import Layout from "../components/Layout"


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
      <h1 className="text-gray-400 text-3xl font-bold pl-4 mt-10 md:mb-10">
        Empresas Cadastradas
      </h1>
      <div className=" items-center m-auto grid md:grid-cols-2 gap-8 md:w-2/3 p-4">
        <ul className=" bg-white rounded-md shadow-2xl p-4">
          {
            empresas && empresas.map((empresa) => (
              <li

                className="flex uppercase justify-between items-center bg-gray-100 mb-4 rounded-md p-2" key={empresa.id}>
                {empresa.name}
                <button
                  onClick={() => handleButtonDelete(empresa.id, empresa.name)}
                  className="p-2 bg-red-700 cursor-pointer hover:bg-red-500 transition-all text-white rounded-2xl">Apagar</button>
              </li>
            ))
          }
        </ul>
        <div className="p-4">
          <CadastroEmpresa />
        </div>
      </div>

    </Layout>
  )
}

export default Empresas