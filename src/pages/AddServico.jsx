import { useParams } from 'react-router-dom'

import FormServico from '../components/FormServico'

import TabelaItems from '../components/TabelaItems'
import Layout from '../components/Layout'

const AddServico = () => {
  const { slug } = useParams()

  return (
    <Layout>

      <div className='p-4 flex flex-col gap-3 items-center'>
        <h1 className='text-3xl text-blue-500 font-bold mb-3'>Empresa {slug.toUpperCase()}</h1>
        <FormServico />

        <TabelaItems />
      </div>

    </Layout>
  )
}

export default AddServico