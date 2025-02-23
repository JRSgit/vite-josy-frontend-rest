/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { deleteEmpresa, getEmpresas, getEntregas, getUserOne, postEmpresa, postEntrega, postUser, postUserSession, updateItem, updateUserLogout } from "../services/api";
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppProvider = ({ children }) => {

  // =================================================
  const loadFromLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // ===========================================================

  const [login, setLogin] = useState(() => loadFromLocalStorage('login', false))
  const [items, setItems] = useState(() => loadFromLocalStorage('items', []))

  const [user, setUser] = useState(() => loadFromLocalStorage('user', []))
  const [token, setToken] = useState(() => loadFromLocalStorage('token', ''))
  const [empresas, setEmpresas] = useState(() => loadFromLocalStorage('empresas', []))
  const [loading, setLoading] = useState(() => loadFromLocalStorage('loading', false))

  // Salva o estado login no localStorage sempre que o estado é atualizado
  useEffect(() => {
    saveToLocalStorage('login', login)
  }, [login])

  useEffect(() => {
    saveToLocalStorage('items', items)
  }, [items])

  useEffect(() => {
    saveToLocalStorage('user', user)
  }, [user])

  useEffect(() => {
    saveToLocalStorage('token', token)
  }, [token])

  useEffect(() => {
    saveToLocalStorage('empresas', empresas)
  }, [empresas])

  useEffect(() => {
    saveToLocalStorage('loading', loading)
  }, [loading])


  useEffect(() => {
    if (login) {
      handleGetItemsStart()
      handleGetEmpresas()
    }
  }, [login])

  // ======================================

  const handleSetLogin = (status) => {
    setLogin(status)
  }

  const handleLogout = async () => {
    const data = {
      email: user.email,
      isLoged: false
    }

    await updateUserLogout(data)
    localStorage.removeItem('empresas')
    localStorage.removeItem('loading')
    localStorage.removeItem('token')
    localStorage.removeItem('items')
    localStorage.removeItem('user')
    setLogin(false)
  }

  const handleSetItems = (data) => {
    setItems((prev) => [...prev, data])
  }

  // Function Get =========================================

  async function handleGetItemsStart() {
    const data = await getEntregas(token)
    if (data.length > items.length) {
      setItems(data)
    }
    return data;
  }

  async function handleGetEmpresas() {
    const data = await getEmpresas(token)
    if (data.length > empresas.length) {
      setEmpresas(data)
    }
    return data;
  }

  // Items filtrado por empresa ==============

  function handleGetItems(path) {
    const data = items.filter((item) => item.empresa === path.toString())
    return data;
  }

  const handleGetUserOne = async () => {
    try {
      const resp = await getUserOne()
      setUser(resp)
    } catch (error) {
      return console.log(error)
    }
  }


  // Function Post =============================================

  async function handlePostUser(data) {
    try {
      setLoading(true)
      const resp = await postUser(data)
      if (resp.data) {
        toast.success("Usuario cadastrado com sucesso")
        setLoading(false)
      }

    } catch (error) {
      toast.error(error.response.data.error)

    }
  }

  async function handlePostEntregas(data) {
    try {
      const resp = await postEntrega(data, token)
      handleSetItems(resp)

    } catch (error) {
      return console.log(error)
    }
  }
  async function handlePostEmpresa(data) {
    try {
      const resp = await postEmpresa(data, token)
      if (resp.data) {
        setEmpresas((prev) => [...prev, resp.data])
      }

    } catch (error) {
      return console.log(error)
    }
  }

  async function handlePostUserSession(data) {
    try {
      setLoading(true)
      const resp = await postUserSession(data)
      if (resp.token) {
        setToken(resp.token)
        setUser({ id: resp.id, name: resp.name, email: resp.email })
        setLoading(false)
        setLogin(true)
      }

    } catch (error) {
      toast.error(error.response.data.error)
      setLoading(false)
      return
    }
  }

  // Function Update =====================================================

  async function handleUpdateItem(id, data) {
    try {
      const dados = { status: data }
      await updateItem(id, dados, token)

      return true
    } catch (error) {
      toast.error(error.response.data.error)
      return false
    }
  }

  // =====================================================================
  // Function Delete =====================================================
  async function handleDeleteEmpresa(id) {
    try {
      // console.log(id)
      await deleteEmpresa(id, token)
      const novasEmpresas = empresas.filter((item) => item.id !== id)
      setEmpresas(novasEmpresas)
    } catch (error) {
      return console.log(error)
    }
  }

  // =====================================================================
  return (
    <AppContext.Provider value={{
      user,
      login,
      items,
      loading,
      empresas,
      handleLogout,
      handleSetLogin,
      handleSetItems,
      handleGetItems,
      handlePostUser,
      handleUpdateItem,
      handleGetUserOne,
      handleGetEmpresas,
      handlePostEmpresa,
      handlePostEntregas,
      handleDeleteEmpresa,
      handlePostUserSession
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;