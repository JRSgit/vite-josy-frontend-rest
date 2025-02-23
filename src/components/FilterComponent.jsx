/* eslint-disable react/prop-types */

import { useState } from "react";


const FilterComponent = ({ onFilter }) => {

  const [filters, setFilters] = useState({
    data: '',
    status: '',
    refeicao: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filters.data === '' && filters.refeicao === '' && filters.status === '') {
      console.log(filters)
      onFilter([])
      return
    }
    onFilter(filters);
  };

  return (
    <div className="bg-white shadow-2xl flex items-center justify-between rounded-md w-fit p-2">
      <form
        onSubmit={handleSubmit}
        className=" flex gap-10 items-center">
        <div className="flex flex-col bg-gray-100 rounded-md p-2">
          <label className="text-gray-400" htmlFor="data">Filtar por Data:</label>
          <input
            type="date"
            name="data"
            value={filters.data}
            onChange={handleChange}
            className="mr-2 p-2 rounded-md bg-gray-300"
          />

        </div>
        <div className="flex flex-col bg-gray-100 rounded-md p-2">
          <label className="text-gray-400" htmlFor="status">Filtar por Status:</label>
          <select
            className="bg-gray-300 rounded-md p-2"
            onChange={handleChange}
            name="status" id="status">
            <option value="">Selecione</option>
            <option value="entregue">Entregue</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div className="flex flex-col bg-gray-100 rounded-md p-2">
          <label className="text-gray-400" htmlFor="status">Filtar por Refeição:</label>
          <select
            className="bg-gray-300 rounded-md p-2"
            onChange={handleChange}
            name="refeicao" id="refeicao">
            <option value="">Selecione</option>
            <option value="cafe">Café</option>
            <option value="almoco">Almoço</option>
            <option value="janta">Janta</option>
          </select>
        </div>

        <button type="submit"
          className="px-6 py-2 h-fit rounded-md bg-blue-500 text-white cursor-pointer">
          Filtrar
        </button>
      </form>

    </div>
  );
};

export default FilterComponent;