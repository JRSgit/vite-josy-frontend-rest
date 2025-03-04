import { useContext, useEffect } from "react"

import { AppContext } from "./context/AppContext"
import { Routes, Route } from "react-router-dom"

import TesteTable from "./components/TesteTable"
import AddServico from "./pages/AddServico"
import Entregas from "./pages/Entregas"
import SiginUp from "./pages/SiginUp"
import Login from "./pages/Login"
import App from "./App"
import Empresas from "./pages/Empresas"

const AllRouter = () => {
  const { token, handleIfLogin } = useContext(AppContext)

  useEffect(() => {
    handleIfLogin()
  }, [])

  return (
    <>
      {
        token ? (
          <Routes>
            <Route index element={<App />} />
            <Route path="/add_servico/:slug" element={<AddServico />} />
            <Route path='/teste' element={<TesteTable />} />
            <Route path='/entregas' element={<Entregas />} />
            <Route path='/empresas' element={<Empresas />} />
            <Route path="/cadastro" element={<SiginUp />} />
          </Routes>
        ) : (
          <Routes>
            <Route index element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        )
      }

    </>
  )
}

export default AllRouter