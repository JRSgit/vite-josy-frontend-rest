import { useContext } from "react";

import { AppContext } from "../context/AppContext";

import { format } from 'date-fns'


const UltimasEntregas = () => {
  const { items } = useContext(AppContext)

  const filtrarItems = items.filter((item) => item.data === format(new Date(), 'yyyy-MM-dd'))

  return (
    <div className="w-full ">
      <h1 className="md:text-2xl text-xl mb-3 text-gray-500 font-semibold">Entregas de hoje</h1>
      <table className="w-full table p-6 rounded-lg bg-white shadow-2xl  overflow-hidden">
        <thead className=" bg-gray-300">
          <tr className="">
            <th>Empresa</th>
            <th>Refeição</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {
            filtrarItems && filtrarItems.map((item, i) => (
              <tr key={item.id}
                className={`w-full ${i % 2 === 1 ? 'bg-gray-100' : ''} rounded-lg text-center p-2 `}>
                <td className="uppercase text-sm md:text-md">{item.empresa}</td>
                <td className="capitalize text-sm md:text-md">{item.refeicao}</td>
                <td className="">{item.quantidade}</td>
              </tr>

            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UltimasEntregas