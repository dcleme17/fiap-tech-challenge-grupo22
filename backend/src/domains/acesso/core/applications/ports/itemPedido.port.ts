import { ItemPedido } from "domains/acesso/core/entities/itemPedido"
import { ItemPedidoVersao } from "domains/acesso/core/entities/itemPedido.versao"

export interface IItemPedido {
    adiciona: (itemPedido: ItemPedido) => Promise<ItemPedidoVersao | null>
    atualiza: (itemPedido: ItemPedido) => Promise<ItemPedidoVersao | null>
    buscaUltimaVersao: (codigoPedido: string) => Promise<ItemPedido | null>
}