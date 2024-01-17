import { Pedido } from "domains/acesso/core/entities/pedido";
import { PedidoVersao } from "domains/acesso/core/entities/pedido.versao";
import { PedidoDatabase } from "domains/acesso/adapter/driven/infra/database/pedido.database"
import { CustomError } from "domains/suporte/entities/custom.error"

export class PedidoService {

    constructor(private readonly database: PedidoDatabase) {
        this.database = database
    }

    async adiciona(pedido: Pedido): Promise<PedidoVersao> {

        const ultimaVersao = await this.database.buscaUltimaVersao(pedido.getCodigoPedido())

        if (ultimaVersao) {
            throw new CustomError('Já existe pedido para esse Codigo', 400, false, [])
        }

        return await this.database.adiciona(pedido).then()
    }

    async atualiza(pedido: Pedido): Promise<PedidoVersao> {

        const ultimaVersao = await this.database.buscaUltimaVersao(pedido.getCodigoPedido())

        if (ultimaVersao) {

            if (pedido.equals(ultimaVersao)) {
                throw new CustomError('Nenhuma informação para atualizar', 400, false, [])
            }
        } else {
            throw new CustomError('Pedido não encontrado', 404, false, [])
        }

        return await this.database.atualiza(pedido).then()
    }

    async buscaUltimaVersao(codigoPedido: string): Promise<Pedido> {

        const ultimaVersao = await this.database.buscaUltimaVersao(codigoPedido)

        if (ultimaVersao) {
            return ultimaVersao
        } else {
            throw new CustomError('Pedido não encontrado com o codigo informado', 404, false, [])
        }
    }
}