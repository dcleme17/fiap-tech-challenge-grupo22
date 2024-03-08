import { EventosPedido } from "domains/pedido/core/entities/pedido"

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

export const post_webhook_pedido = {
    $codigoPedido: '20240303_000006',
    $evento: EventosPedido.PAGO
}

export const put_pedido_status = {
    $statusPedido: "Em Preparação",
}
