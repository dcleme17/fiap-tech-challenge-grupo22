import { Produto } from "domains/acesso/core/entities/produto"
import { ProdutoVersao } from "domains/acesso/core/entities/produto.versao"

export interface IProduto {
    adiciona: (produto: Produto) => Promise<ProdutoVersao | null>
    atualiza: (produto: Produto) => Promise<ProdutoVersao | null>
    buscaUltimaVersao: (codigo: string) => Promise<Produto | null>
    buscaCategoria: (categoria: string) => Promise<Array<Produto>>
}