import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
function pedidosPDF(pedidos){
    console.log(pedidos);

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const reportTitle = [
        {
            text: 'Relatório de Pedidos ',
            fontSize: 15,
            bold: true,
            margin: [15,20,0,45]
        }
    ];
    const dados = pedidos.map((pedido) => {
        return [
            {text: pedido.nome_produto_final,  fontSize: 9, margin: [0,2,0,2] },
            {text: pedido.status,  fontSize: 9, margin: [0,2,0,2]},
            {text: pedido.descricao,  fontSize: 9, margin: [0,2,0,2]},
            {text: pedido.data.substring(0,10),  fontSize: 9, margin: [0,2,0,2]},
            {text: pedido.valor_produto_vendido + 'R$',  fontSize: 9, margin: [0,2,0,2]},
            {text: pedido.valor + 'R$', fontSize: 9, margin: [0,2,0,2]}
        ]
    })

    const details = [
        'Cliente: ' + pedidos[0].nome_cliente,

        {
        table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*','*','*'],
            body: [
                [
                    {text: 'Produto Vendido', style: 'tableHeader', fontSize: 10},
                    {text: 'Status', style: 'tableHeader', fontSize: 10},
                    {text: 'Descrição', style: 'tableHeader', fontSize: 10},
                    {text: 'Data da Venda', style: 'tableHeader', fontSize: 10},
                    {text: 'Valor do Produto', style: 'tableHeader', fontSize: 10},
                    {text: 'Valor final da Compra', style: 'tableHeader', fontSize: 10}
                ],
                ...dados
            ]
            
        },
        layout: {	hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 2 : 1;
        },
        vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
        },
        vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
        },}//headerLineonly
        
    }];

    function Rodape(currentPage, pageCount){
        return[
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 15,
                margin: [0,10,20,0]
            }
        ]
    }

    const docDefinitios ={
        pageSize: 'A4',
        pageMargins: [15,50,15,45],

        header: [reportTitle],
        content: [details],
        footer: Rodape
    }
    pdfMake.createPdf(docDefinitios).download();
}
export default pedidosPDF;