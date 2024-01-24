import { ItemPedido } from "domains/pedido/core/entities/itemPedido"
import { ItemPedidoVersao } from "domains/pedido/core/entities/itemPedido.versao"

export interface IItemPedido {
    adiciona: (itemPedido: ItemPedido) => Promise<ItemPedidoVersao | null>
    atualiza: (itemPedido: ItemPedido) => Promise<ItemPedidoVersao | null>
    buscaUltimaVersao: (codigoPedido: string) => Promise<ItemPedido | null>
}