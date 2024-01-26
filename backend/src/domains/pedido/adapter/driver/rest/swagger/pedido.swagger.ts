export const get_pedido = { 
    $pedidos: [
        {
            $codigoPedido: "000002",
            $cpf: "98765432120",
            $data: "14/01/2023",
            $horaEntrada: "16:00",
            $horaSaida: "16:30",
            $valor: "45,00",
            $status: "Finalizado",
            $itensPedidos: [
                {
                    $codigoPedido: "000002",
                    $codigoProduto: "000001",
                    $descricaoProduto: "Hamburguer",
                    $qtde: "2",
                    $valor: "15,00",
                    $observacao: "Sem cebola"
                },
                {
                    $codigoPedido: "000002",
                    $codigoProduto: "000005",
                    $descricaoProduto: "MilkShake Chocolate",
                    $qtde: "1",
                    $valor: "15,00",
                    $observacao: ""
                }
            ]
        }    
    ]
}

export const post_pedido = {
    $cpf: "12345678910",
    $itens: [
        {
            $codigoProduto: "000001",
            $quantidade: 1 ,
            $observacao: "Sem cebola"
        }
    ]
} 

export const put_pedido = {
    $cpf: "12345678910",
    $itens: [
        {
            $codigoProduto: "000001",
            $quantidade: 1 ,
            $observacao: "Sem cebola"
        }
    ]
}