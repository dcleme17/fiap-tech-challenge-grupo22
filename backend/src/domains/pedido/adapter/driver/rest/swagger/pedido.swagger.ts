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
                    $codigoProduto: "000001",
                    $descricaoProduto: "Hamburguer",
                    $qtde: "2",
                    $valor: "15,00",
                    $observacao: "Sem cebola"
                },
                {
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
    $codigoPedido: "000001",
    $cpf: "12345678910",
    $data: "13/01/2023",
    $horaEntrada: "18:05",
    $horaSaida: "18:15",
    $valorPedido: "46,00",
    $status: "Finalizado",
    $itensPedidos: [
        {
            $codigoProduto: "000001",
            $descricaoProduto: "Hamburguer",
            $qtde: "1",
            $valor: "20,00",
            $observacao: "Sem cebola"
        }
    ]
} 

export const put_pedido = {
    $codigoPedido: "000001",
    $cpf: "12345678910",
    $data: "13/01/2023",
    $horaEntrada: "18:05",
    $horaSaida: "18:15",
    $valorPedido: "46,00",
    $status: "Finalizado",
    $itensPedidos: [
        {
            $codigoProduto: "000001",
            $descricaoProduto: "Hamburguer",
            $qtde: "1",
            $valor: "20,00",
            $observacao: "Sem cebola"
        }
    ]
}