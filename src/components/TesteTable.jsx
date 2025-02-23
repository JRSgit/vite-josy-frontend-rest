import { useState, useEffect } from 'react';

const TesteTable = () => {
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({
    cliente: '',
    refeicao: 'Almoço',
    quantidade: 1,
    valor: '10.00',
    data: new Date().toISOString().slice(0, 10),
    status: 'Pendente',
    formaPagamento: 'Dinheiro',
    colaborador: '',
  });
  const [filtros, setFiltros] = useState({ data: '', status: '' });

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos(dadosSalvos);
  }, []);

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    setPedidos([...pedidos, form]);
    setForm({
      cliente: '',
      refeicao: 'Almoço',
      quantidade: 1,
      valor: '10.00',
      data: new Date().toISOString().slice(0, 10),
      status: 'Pendente',
      formaPagamento: 'Dinheiro',
      colaborador: '',
    });
  };

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const filtraData = filtros.data ? pedido.data === filtros.data : true;
    const filtraStatus = filtros.status ? pedido.status === filtros.status : true;
    return filtraData && filtraStatus;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestão de Pedidos</h2>

      {/* Formulário de Cadastro */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Adicionar Pedido</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="cliente"
            value={form.cliente}
            onChange={handleInputChange}
            placeholder="Cliente"
            className="border rounded px-4 py-2 w-full"
          />
          <select
            name="refeicao"
            value={form.refeicao}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="Almoço">Almoço</option>
            <option value="Jantar">Jantar</option>
            <option value="Lanche">Lanche</option>
          </select>
          <input
            type="number"
            name="quantidade"
            value={form.quantidade}
            onChange={handleInputChange}
            placeholder="Quantidade"
            min="1"
            className="border rounded px-4 py-2 w-full"
          />
          <select
            name="valor"
            value={form.valor}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="10.00">10.00</option>
            <option value="20.00">20.00</option>
            <option value="30.00">30.00</option>
          </select>
          <input
            type="text"
            name="data"
            value={form.data}
            readOnly
            className="border rounded px-4 py-2 w-full"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="Pendente">Pendente</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <select
            name="formaPagamento"
            value={form.formaPagamento}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão">Cartão</option>
            <option value="Pix">Pix</option>
          </select>
          <input
            type="text"
            name="colaborador"
            value={form.colaborador}
            onChange={handleInputChange}
            placeholder="Colaborador(a)"
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Salvar
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Filtros</h3>
        <div className="flex gap-4">
          <input
            type="date"
            name="data"
            value={filtros.data}
            onChange={(e) => setFiltros({ ...filtros, data: e.target.value })}
            className="border rounded px-4 py-2"
          />
          <select
            name="status"
            value={filtros.status}
            onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
            className="border rounded px-4 py-2"
          >
            <option value="">Todos</option>
            <option value="Pendente">Pendente</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Pedidos</h3>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {['Cliente', 'Refeição', 'Quantidade', 'Valor', 'Data', 'Status', 'Forma Pagamento', 'Colaborador(a)'].map(
                (header) => (
                  <th key={header} className="border px-4 py-2 text-left">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map((pedido, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{pedido.cliente}</td>
                <td className="border px-4 py-2">{pedido.refeicao}</td>
                <td className="border px-4 py-2">{pedido.quantidade}</td>
                <td className="border px-4 py-2">{pedido.valor}</td>
                <td className="border px-4 py-2">{pedido.data}</td>
                <td className="border px-4 py-2">{pedido.status}</td>
                <td className="border px-4 py-2">{pedido.formaPagamento}</td>
                <td className="border px-4 py-2">{pedido.colaborador}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TesteTable;
