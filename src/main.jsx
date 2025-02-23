import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import AllRouter from './AllRouter.jsx'

import AppProvider from './context/AppContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <AllRouter />
        <ToastContainer />
      </BrowserRouter>

    </AppProvider>
  </StrictMode>,
)
