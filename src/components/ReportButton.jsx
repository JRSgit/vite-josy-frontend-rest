
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Modal = ({
  setPrecoCafe,
  setPrecoAlmoco,
  setIsOpen,
  isOpen,
  handleExportPDF }) => {

  return (
    <dialog open={isOpen} className='fixed flex p-6 items-center justify-center  top-0 left-0 bg-black/50 w-full min-h-screen'>
      <div className='bg-white shadow-lg rounded-md p-6 w-full md:w-1/3 h-fit relative'>
        <button
          onClick={() => setIsOpen(false)}
          className='text-xl text-red-500 cursor-pointer  absolute top-3 right-5'>
          X
        </button>
        <h2 className='text-xl text-gray-500 font-semibold mb-6'>Digite o valor das refeições</h2>
        <div className='flex max-sm:flex-col items-center gap-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="">Valor do café:</label>
            <input
              className='w-[100px] bg-gray-300 md:p-2 p-1 rounded-md md:mb-4'
              onChange={(e) => setPrecoCafe(parseInt(e.target.value))}
              type="number" placeholder='Valor' min={0}
            />
          </div>
          <div className='flex flex-col gap-1 items-center'>
            <label htmlFor="">Valor do almoço:</label>
            <input
              className='w-[100px] bg-gray-300 md:p-2 p-1 rounded-md md:mb-4'
              onChange={(e) => setPrecoAlmoco(parseInt(e.target.value))}
              type="number" placeholder='Valor' min={0}
            />
          </div>
          {/* <div className='flex flex-col gap-1'>
            <label htmlFor="">Valor da janta:</label>
            <input
              className='w-[100px] bg-gray-300 md:p-2 p-1 rounded-md md:mb-4'
              onChange={(e) =parseInt(e.target.value))}
              type="number" placeholder='Valor' min={0}
            />
          </div> */}

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
  const [precoCafe, setPrecoCafe] = useState(0)
  // const [precoJanta, setPrecoJanta] = useState(0)
  const [precoAlmoco, setPrecoAlmoco] = useState(0)
  const [cafe, setCafe] = useState()
  const [janta, setJanta] = useState()
  const [almoco, setAlmoco] = useState()

  useEffect(() => {
    setCafe(() => data.filter((item) => item.refeicao === 'Café'))
    setJanta(() => data.filter((item) => item.refeicao === 'Janta'))
    setAlmoco(() => data.filter((item) => item.refeicao === 'Almoço'))
  }, [data])
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

    // Calcula o total de quantidades de Café
    const totalQuantidadeCafe = cafe.reduce((sum, item) => sum + item.quantidade, 0);
    const valorTotalCafe = totalQuantidadeCafe * precoCafe;

    // Calcula o total de quantidades Janta
    const totalQuantidadeJanta = janta.reduce((sum, item) => sum + item.quantidade, 0);
    const valorTotalJanta = totalQuantidadeJanta * precoAlmoco;

    // Calcula o total de quantidades Almoço
    const totalQuantidadeAlmoco = almoco.reduce((sum, item) => sum + item.quantidade, 0);
    const valorTotalAlmoco = totalQuantidadeAlmoco * precoAlmoco;

    const totalQuantidadeRefeicao = totalQuantidadeCafe + totalQuantidadeJanta + totalQuantidadeAlmoco
    const valorQuantidadeRefeicao = valorTotalCafe + valorTotalJanta + valorTotalAlmoco

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
    doc.text(`Total de refeições entregues nesse período: ${totalQuantidadeRefeicao}`, 10, finalY + 10);
    doc.text(`Valor Total do Café: R$ ${valorTotalCafe.toFixed(2)}`, 10, finalY + 20);
    doc.text(`Valor Total do Janta: R$ ${valorTotalJanta.toFixed(2)}`, 10, finalY + 30);
    doc.text(`Valor Total do Almoço: R$ ${valorTotalAlmoco.toFixed(2)}`, 10, finalY + 40);
    doc.text(`Valor Total das Refeições: R$ ${valorQuantidadeRefeicao.toFixed(2)}`, 10, finalY + 55);
    doc.text(`Josy Restaurante`, 80, finalY + 75);

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
          <Modal setPrecoCafe={setPrecoCafe}
            setPrecoAlmoco={setPrecoAlmoco} isOpen={isOpen}
            setIsOpen={setIsOpen} handleExportPDF={handleExportPDF} />

        ) : ('')
      }

    </>
  );
};

export default ReportButton;