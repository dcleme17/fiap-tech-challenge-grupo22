import { Produto } from "domains/pedido/core/entities/produto";
import { ProdutoVersao } from "domains/pedido/core/entities/produto.versao";
import { ProdutoDatabase } from "domains/pedido/adapter/driven/infra/database/produto.database"
import { CustomError } from "domains/suporte/entities/custom.error"

export class ProdutoUseCases {

    constructor(private readonly database: ProdutoDatabase) {
        this.database = database
    }

    async adiciona(produto: Produto): Promise<ProdutoVersao> {

        try {
            const ultimaVersao = await this.database.buscaUltimaVersao(produto.getCodigo())

            if (ultimaVersao) {
                throw new CustomError('Já existe produto para esse Codigo', 400, false, [])
            }
        } catch (err) {
            console.log("Nenhum produto encontrado")
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

    async buscaCategoria(categoria: string): Promise<Array<Produto>> {

        const listaProduto = await this.database.buscaCategoria(categoria)

        if (listaProduto) {
            return listaProduto
        } else {
            throw new CustomError('Produto não encontrado com o codigo informado', 404, false, [])
        }
    }

    async buscaListaProduto(): Promise<Array<Produto>> {

        const listaProduto = await this.database.buscaListaProduto()

        if (listaProduto) {
            return listaProduto
        } else {
            throw new CustomError('Produto não encontrado na base', 404, false, [])
        }
    }

    async remove(codigo : string) {

        try {
            const retorno = await this.database.remove(codigo)
        } catch (err) {
            throw new CustomError('Erro ao remover o produto da base', 404, false, [])
        }
    }
}