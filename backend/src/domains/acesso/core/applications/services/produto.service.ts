import { Produto } from "domains/acesso/core/entities/produto";
import { ProdutoVersao } from "domains/acesso/core/entities/produto.versao";
import { ProdutoDatabase } from "domains/acesso/adapter/driven/infra/database/produto.database"
import { CustomError } from "domains/suporte/entities/custom.error"

export class ProdutoService {

    constructor(private readonly database: ProdutoDatabase) {
        this.database = database
    }

    async adiciona(produto: Produto): Promise<ProdutoVersao> {

        const ultimaVersao = await this.database.buscaUltimaVersao(produto.getCodigo())

        if (ultimaVersao) {
            throw new CustomError('Já existe procuto para esse Codigo', 400, false, [])
        }

        return await this.database.adiciona(produto).then()
    }

    async atualiza(produto: Produto): Promise<ProdutoVersao> {

        const ultimaVersao = await this.database.buscaUltimaVersao(produto.getCodigo())

        if (ultimaVersao) {

            if (produto.equals(ultimaVersao)) {
                throw new CustomError('Nenhuma informação para atualizar', 400, false, [])
            }
        } else {
            throw new CustomError('Produto não encontrado', 404, false, [])
        }

        return await this.database.atualiza(produto).then()
    }

    async buscaUltimaVersao(codigo: string): Promise<Produto> {

        const ultimaVersao = await this.database.buscaUltimaVersao(codigo)

        if (ultimaVersao) {
            return ultimaVersao
        } else {
            throw new CustomError('Produto não encontrado com o codigo informado', 404, false, [])
        }
    }
}