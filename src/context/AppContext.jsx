/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  deleteEmpresa,
  getEmpresas,
  getEntregas,
  getUserOne,
  postEmpresa,
  postEntrega,
  postUser,
  postUserSession,
  updateItem,
  updateUserLogout
} from "../services/api";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { redirect } from "react-router-dom";

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

  const dataInput = format(new Date().toString(), 'yyyy-MM-dd')

  const [cafe, setCafe] = useState(() => loadFromLocalStorage('cafe', ''))
  const [janta, setJanta] = useState(() => loadFromLocalStorage('janta', ''))
  const [almoco, setAlmoco] = useState(() => loadFromLocalStorage('almoco', ''))


  const handleItemsTotal = () => {
    if (items.length > 0 && login) {
      setCafe(() => items.filter((item) => item.refeicao === 'Café'))
      setJanta(() => items.filter((item) => item.refeicao === 'Janta'))
      setAlmoco(() => items.filter((item) => item.refeicao === 'Almoço'))

    }

  }

  // Salva o estado login no localStorage sempre que o estado é atualizado
  useEffect(() => {
    saveToLocalStorage('login', login)
  }, [login])

  useEffect(() => {
    handleItemsTotal()
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
    saveToLocalStorage('cafe', cafe)
  }, [cafe])

  useEffect(() => {
    saveToLocalStorage('almoco', almoco)
  }, [almoco])

  useEffect(() => {
    saveToLocalStorage('janta', janta)
  }, [janta])


  useEffect(() => {
    const loginOn = async () => {
      try {
        if (login) {
          await handleGetItemsStart()
          await handleGetEmpresas()

        }

      } catch (error) {
        console.log(error)
        return
      }
    }
    loginOn()
  }, [login, token])

  // ======================================

  const handleSetLogin = (status) => {
    setLogin(status)
  }

  const handleLogout = async () => {
    const data = {
      email: user.email,
      isLoged: false
    }
    if (user.email) {
      updateUserLogout(data)

    }
    localStorage.removeItem('empresas')
    localStorage.removeItem('loading')
    setToken(null)
    localStorage.removeItem('login')
    localStorage.removeItem('items')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('cafe')
    localStorage.removeItem('almoco')
    localStorage.removeItem('janta')
    setLogin(false)
    redirect('/')
  }

  const handleSetItems = (data) => {
    setItems((prev) => [...prev, data])
  }

  const handleIfLogin = async () => {
    await handleLogout()
  }

  // Function Get =========================================

  async function handleGetItemsStart() {
    try {
      const resp = await getEntregas(token)
      if (resp.data.length !== items.length) {
        setItems(resp.data)
      }
      return resp.data;

    } catch (error) {
      toast.error("Não conseguir resposta do servidor")
      return
    }
  }

  async function handleGetEmpresas() {
    try {
      const resp = await getEmpresas(token)
      if (resp.data.length > empresas.length) {
        setEmpresas(resp.data)
      }
      return resp.data;

    } catch (error) {
      toast.error("Não teve resposta do servidor")
    }
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

      if (data.dataTime === '') {
        data.dataTime = dataInput
      }

      const resp = await postEntrega(data, token)
      handleSetItems(resp)
      toast.success('Entregra cadastrada com sucesso!', { autoClose: 2000 })

    } catch (error) {
      toast.error('Error cadastrada entregra!', { autoClose: 2000 })
      return console.log(error)
    }
  }
  async function handlePostEmpresa(data) {
    try {
      const resp = await postEmpresa(data, token)
      if (resp.data) {
        setEmpresas((prev) => [...prev, resp.data])

        toast.success('Empresa cadastrada com sucesso!', { autoClose: 2000 })
      }

    } catch (error) {
      toast.error('Error cadastrada empresa!', { autoClose: 2000 })
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

  async function handleUpdateItem(id, dados) {
    try {
      // const dados = { status: data }
      const resp = await updateItem(id, dados, token)
      if (resp.status === 200) {
        const itemsAtualizado = items.map(item =>
          item.id === id ? { ...item, status: dados.status, quantidade: dados.quantidade, data: dados.data } : item
        );
        setItems(itemsAtualizado)

        toast.success('Item atualizado com sucesso', { autoClose: 2000 })

      }

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
      cafe,
      user,
      janta,
      login,
      token,
      items,
      almoco,
      loading,
      empresas,
      handleLogout,
      handleIfLogin,
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