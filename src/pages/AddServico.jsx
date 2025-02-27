import { Link, useParams } from 'react-router-dom'

import FormServico from '../components/FormServico'

import TabelaItems from '../components/TabelaItems'
import Layout from '../components/Layout'
import { FaArrowLeft } from 'react-icons/fa'

const AddServico = () => {
  const { slug } = useParams()

  return (
    <Layout>

      <div className='p-4 flex flex-col gap-3 items-center'>
        <h1 className='text-3xl text-blue-500 font-bold mb-3'>Empresa {slug.toUpperCase()}</h1>
        <Link className='text-start w-full text-gray-400 font-normal' to='/' title='voltar'>
          <FaArrowLeft size={20} />
        </Link>
        <FormServico />

        <TabelaItems />
      </div>

    </Layout>
  )
}

export default AddServico