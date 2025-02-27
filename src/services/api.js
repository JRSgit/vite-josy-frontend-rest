import api from './axios.js'

// User =========================================
async function getUserOne(email) {
  try {
    const resp = await api.get('/user', { email })

    return resp.data

  } catch (error) {
    console.log(error)
    return error
  }
}

async function getUser() {
  try {
    const resp = await api.get('/users')

    return resp.data

  } catch (error) {
    return error
  }
}

async function postUser(data) {
  const resp = await api.post(`/user`, { data })
  return resp;

}

async function postUserSession(data) {
  const resp = await api.post(`session`, { data })
  return resp.data;


}
async function updateUserLogout(data) {
  const resp = await api.put(`session`, { data })
  return resp;


}

async function updateUser(id, data) {
  try {
    const resp = await api.put(`/user/${id}`, { data })
    return resp.data();

  } catch (error) {
    return error
  }
}
async function deleteUser(id) {
  try {
    const resp = await api.delete(`/user/${id}`)
    return resp.data();

  } catch (error) {
    return error
  }
}

// Entregas ====================================

async function getEntregaOne(id) {
  try {
    const resp = await api.get(`/entrega/${id}`)

    return resp.data

  } catch (error) {
    console.log(error)
    return error
  }
}

async function getEntregas(token) {

  const resp = await api.get(`/entregas`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return resp

}

async function postEntrega(data, token) {
  try {
    const resp = await api.post(`entrega`, { data }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return resp.data

  } catch (error) {
    console.log(error)
    return error
  }
}

async function updateEntrega(id, data) {
  try {
    const resp = await api.put(`/entrega/${id}`, { data })

    return resp.data

  } catch (error) {
    console.log(error)
    return error
  }
}

async function updateItem(id, data, token) {
  try {
    const resp = await api.put(`/entrega/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return resp

  } catch (error) {
    console.log(error)
    return error
  }
}
async function deleteEntrega(id) {
  try {
    const resp = await api.put(`/entrega/${id}`)

    return resp.data

  } catch (error) {
    console.log(error)
    return error
  }
}

// Empresas ===========================================

async function getEmpresaOne(id) {
  try {
    const resp = await api.get(`/empresa/${id}`)

    return resp.data

  } catch (error) {
    console.log(error)
    return error
  }
}

async function getEmpresas(token) {

  const resp = await api.get(`/empresas`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return resp
}

async function postEmpresa(data, token) {
  try {
    const resp = await api.post(`/empresa`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    })
    return resp

  } catch (error) {
    console.log(error)
    return error
  }
}
// async function updateEmpresa(id, data) {
//   try {
//     const resp = await api.put(`{/empresa/:${id}}`, { data })

//     return resp.data

//   } catch (error) {
//     console.log(error)
//     return error
//   }
// }
async function deleteEmpresa(id, token) {
  try {
    await api.delete(`/empresa/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return true

  } catch (error) {
    console.log(error)
    return error
  }
}


export {
  getUser,
  postUser,
  getUserOne,
  updateUser,
  deleteUser,
  updateItem,
  getEntregas,
  postEntrega,
  postEmpresa,
  getEmpresas,
  getEntregaOne,
  updateEntrega,
  deleteEntrega,
  getEmpresaOne,
  deleteEmpresa,
  postUserSession,
  updateUserLogout,
}
