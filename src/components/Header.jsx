import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Link } from "react-router-dom"

import avatar from '../assets/avatar.jpg'
import logo from '../assets/Frame23@2x.svg'

const Header = () => {
  const { handleLogout, user } = useContext(AppContext)

  const handleLogoutSend = async () => {
    const isLogout = confirm("Deseja sair da aplicação?")
    if (!isLogout) {
      return
    }
    handleLogout()
  }

  return (
    <nav className="flex items-center justify-between px-6 h-20 w-full bg-slate-500">
      <div className="flex flex-col  items-center">
        <img className="" src={logo} alt="" />
        {/* <h1 className="text-3xl text-orange-500 font-bold">Josy</h1>
        <h3 className="text-xl text-gray-200 font-semibold">Restaurante</h3> */}
      </div>
      <ul className=" flex max-sm:flex-col  md:gap-2 items-center text-orange-500 text-sm md:text-lg font-bold">
        <Link to='/' className="cursor-pointer hover:border-b-2 border-white transition-all">Home</Link>
        <Link to='/entregas' className="cursor-pointer hover:border-b-2 border-white transition-all">Entregas</Link>
        <Link to='/empresas' className="cursor-pointer hover:border-b-2 border-white transition-all">Empresas</Link>
      </ul>
      <div className="flex flex-col items-center ">
        <img
          className="w-10  h-10 border-none rounded-full "
          src={avatar} alt=""
        />
        <h3
          onClick={() => handleLogoutSend()}
          className="text-gray-50 font-bold cursor-pointer hover:border-orange-500 hover:border-b">{
            user.name
          }</h3>

      </div>
    </nav>
  )
}

export default Header