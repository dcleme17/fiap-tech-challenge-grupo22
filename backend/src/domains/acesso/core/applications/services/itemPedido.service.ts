import { ItemPedido } from "domains/acesso/core/entities/itemPedido";
import { ItemPedidoVersao } from "domains/acesso/core/entities/itemPedido.versao";
import { ItemPedidoDatabase } from "domains/acesso/adapter/driven/infra/database/itemPedido.database"
import { CustomError } from "domains/suporte/entities/custom.error"

export class ItemPedidoService {

    constructor(private readonly database: ItemPedidoDatabase) {
        this.database = database
    }

    async adiciona(ItemPedido: ItemPedido): Promise<ItemPedidoVersao> {

        const ultimaVersao = await this.database.buscaUltimaVersao(ItemPedido.getCodigoPedido())

        if (ultimaVersao) {
            throw new CustomError('Já existe item do pedido para esse Codigo', 400, false, [])
        }

        return await this.database.adiciona(ItemPedido).then()
    }

    async atualiza(ItemPedido: ItemPedido): Promise<ItemPedidoVersao> {

        const ultimaVersao = await this.database.buscaUltimaVersao(ItemPedido.getCodigoPedido())

        if (ultimaVersao) {

            if (ItemPedido.equals(ultimaVersao)) {
                throw new CustomError('Nenhuma informação para atualizar', 400, false, [])
            }
        } else {
            throw new CustomError('Item do Pedido não encontrado', 404, false, [])
        }

        return await this.database.atualiza(ItemPedido).then()
    }

    async buscaUltimaVersao(codigoPedido: string): Promise<ItemPedido> {

        const ultimaVersao = await this.database.buscaUltimaVersao(codigoPedido)

        if (ultimaVersao) {
            return ultimaVersao
        } else {
            throw new CustomError('Item do Pedido não encontrado com o codigo informado', 404, false, [])
        }
    }
}