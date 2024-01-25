import { Pedido } from "domains/pedido/core/entities/pedido";
import { ItemPedido } from "domains/pedido/core/entities/itemPedido";
import { PedidoVersao } from "domains/pedido/core/entities/pedido.versao";
import { PedidoDatabase } from "domains/pedido/adapter/driven/infra/database/pedido.database"
import { CustomError } from "domains/suporte/entities/custom.error"

export class PedidoService {

    constructor(private readonly database: PedidoDatabase) {
        this.database = database
    }

    async adiciona(pedido: Pedido, itemPedido: Array<ItemPedido>): Promise<PedidoVersao> {

        try {
            const ultimaVersao = await this.database.buscaUltimaVersao(pedido.getCodigoPedido())

            if (ultimaVersao) {
                throw new CustomError('Já existe pedido para esse Codigo', 400, false, [])
            }
        } catch (err) {
            console.log ("Nenhum pedido encontrado")
        }    
            var retorno = await this.database.adiciona(pedido).then()
            await this.database.adicionaItem(itemPedido).then()
            return retorno
        }

    async atualiza(pedido: Pedido, itemPedido: Array<ItemPedido>): Promise<PedidoVersao> {

        const ultimaVersao = await this.database.buscaUltimaVersao(pedido.getCodigoPedido())

        if (ultimaVersao) {
            if (pedido.equals(ultimaVersao)) {
                throw new CustomError('Nenhuma informação para atualizar', 400, false, [])
            }
        } else {
            throw new CustomError('Pedido não encontrado', 404, false, [])
        }
            var retorno = await this.database.adiciona(pedido).then()
            await this.database.atualizaItem(itemPedido).then()
            return retorno
    }

    async buscaUltimaVersao(codigoPedido: string): Promise<Pedido> {

        const ultimaVersao = await this.database.buscaUltimaVersao(codigoPedido)

        if (ultimaVersao) {
            return ultimaVersao
        } else {
            throw new CustomError('Pedido não encontrado com o código informado', 404, false, [])
        }
    }
}