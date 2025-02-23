/* eslint-disable react/prop-types */
import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Modal = ({ setPreco, setIsOpen, isOpen, handleExportPDF }) => {

  return (
    <dialog open={isOpen} className='fixed flex items-center justify-center  top-0 left-0 bg-black/50 w-full min-h-screen'>
      <div className='bg-white shadow-lg rounded-md p-6 w-1/3 h-fit relative'>
        <button
          onClick={() => setIsOpen(false)}
          className='text-xl text-red-500 cursor-pointer  absolute top-3 right-5'>
          X
        </button>
        <h2 className='text-xl text-gray-300 font-semibold mb-6'>Digite o valor da refeição</h2>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Valor:</label>
          <input
            className='w-[200px] bg-gray-300 p-2 rounded-md mb-4'
            onChange={(e) => setPreco(parseInt(e.target.value))}
            type="number" placeholder='Digite o valor' min={0}
          />
        </div>
        <button
          onClick={() => handleExportPDF()}
          className='p-2 bg-red-500 text-white cursor-pointer rounded-md'>
          Exportar
        </button>
      </div>
    </dialog>
  )
}

const ReportButton = ({ data }) => {
  const { slug } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [preco, setPreco] = useState(0)

  // const uper = toString(slug).toUpperCase()
  const handleExportExcel = () => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, `{ Relatório da Empresa X }`);
    writeFile(wb, 'relatorio.xlsx');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Relatório dos Pedidos da ${slug.toUpperCase()}`, 10, 10);

    // Define um valor predefinido para multiplicação (exemplo: R$ 5.00 por unidade)
    // const precoUnitario = 5.00;

    // Calcula o total de quantidades
    const totalQuantidade = data.reduce((sum, item) => sum + item.quantidade, 0);
    const valorTotal = totalQuantidade * preco;

    // Adiciona a tabela
    doc.autoTable({
      startY: 20, // Para dar espaço após o título
      head: [['Refeição', 'Quantidade', 'Status', 'Data']],
      body: data.map((item) => [item.refeicao, item.quantidade, item.status, item.data]),
    });

    // Define a posição Y logo abaixo da tabela
    const finalY = doc.lastAutoTable.finalY + 20;

    // Adiciona o total de itens e o valor calculado abaixo da tabela
    doc.text(`Total de: ${data.length} dias`, 10, finalY);
    doc.text(`Total de refeições entregues nesse período: ${totalQuantidade}`, 10, finalY + 10);
    doc.text(`Valor Total: R$ ${valorTotal.toFixed(2)}`, 10, finalY + 20);
    doc.text(`Josy Restaurante`, 80, finalY + 40);

    // Salva o PDF
    doc.save('relatorio.pdf');
  };


  return (
    <>
      <div className="mb-4">
        <button onClick={handleExportExcel}
          className="mr-2 p-2 bg-green-500 text-white cursor-pointer rounded-md">
          Exportar para Excel
        </button>
        <button onClick={() => setIsOpen(true)}
          className="p-2 bg-red-500 text-white cursor-pointer rounded-md">
          Exportar para PDF
        </button>

      </div>
      {
        isOpen ? (
          <Modal setPreco={setPreco} isOpen={isOpen}
            setIsOpen={setIsOpen} handleExportPDF={handleExportPDF} />

        ) : ('')
      }

    </>
  );
};

export default ReportButton;