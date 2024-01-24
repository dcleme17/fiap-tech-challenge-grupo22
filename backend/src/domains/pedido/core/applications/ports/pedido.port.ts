import { Pedido } from "domains/pedido/core/entities/pedido"
import { PedidoVersao } from "domains/pedido/core/entities/pedido.versao"

export interface IPedido {
    adiciona: (pedido: Pedido) => Promise<PedidoVersao | null>
    atualiza: (pedido: Pedido) => Promise<PedidoVersao | null>
    buscaUltimaVersao: (codigoPedido: string, cpf: string) => Promise<Pedido | null>
}