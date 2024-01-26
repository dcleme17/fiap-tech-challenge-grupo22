import { Pedido } from "domains/pedido/core/entities/pedido"
import { PedidoVersao } from "domains/pedido/core/entities/pedido.versao"

export interface IPedido {
    adiciona: (pedido: Pedido) => Promise<PedidoVersao | null>
    versiona: (pedido: Pedido) => Promise<boolean | null>
    buscaUltimaVersao: (codigoPedido: string, cpf: string) => Promise<Pedido | null>
    listaPedidos: () => Promise<Array<Pedido>> 
    checkout: (codigoPedido: string) => Promise<any | null>
}