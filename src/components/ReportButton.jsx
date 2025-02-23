/* eslint-disable react/prop-types */
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReportButton = ({ data }) => {
  // const uper = toString(slug).toUpperCase()
  const handleExportExcel = () => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, `{ Relatório da Empresa X }`);
    writeFile(wb, 'relatorio.xlsx');
  };


  // const handleExportPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("Relatório dos Pedidos", 10, 10)
  //   doc.autoTable({
  //     head: [['Refeição', 'Quantidade', 'Status', 'Data']],
  //     body: data.map((item) => [item.refeicao, item.quantidade, item.status, item.data]),
  //   });
  //   doc.save('relatorio.pdf');
  // };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório dos Pedidos", 10, 10);

    // Define um valor predefinido para multiplicação (exemplo: R$ 5.00 por unidade)
    const precoUnitario = 5.00;

    // Calcula o total de quantidades
    const totalQuantidade = data.reduce((sum, item) => sum + item.quantidade, 0);
    const valorTotal = totalQuantidade * precoUnitario;

    // Adiciona a tabela
    doc.autoTable({
      startY: 20, // Para dar espaço após o título
      head: [['Refeição', 'Quantidade', 'Status', 'Data']],
      body: data.map((item) => [item.refeicao, item.quantidade, item.status, item.data]),
    });

    // Define a posição Y logo abaixo da tabela
    const finalY = doc.lastAutoTable.finalY + 10;

    // Adiciona o total de itens e o valor calculado abaixo da tabela
    doc.text(`Total de Itens: ${totalQuantidade}`, 10, finalY);
    doc.text(`Valor Total: R$ ${valorTotal.toFixed(2)}`, 10, finalY + 10);

    // Salva o PDF
    doc.save('relatorio.pdf');
  };


  return (
    <div className="mb-4">
      <button onClick={handleExportExcel}
        className="mr-2 p-2 bg-green-500 text-white cursor-pointer rounded-md">
        Exportar para Excel
      </button>
      <button onClick={handleExportPDF}
        className="p-2 bg-red-500 text-white cursor-pointer rounded-md">
        Exportar para PDF
      </button>
    </div>
  );
};

export default ReportButton;