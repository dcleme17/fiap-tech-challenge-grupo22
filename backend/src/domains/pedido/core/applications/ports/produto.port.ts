import { Produto } from "domains/pedido/core/entities/produto"
import { ProdutoVersao } from "domains/pedido/core/entities/produto.versao"

export interface IProduto {
    adiciona: (produto: Produto) => Promise<ProdutoVersao | null>
    atualiza: (produto: Produto) => Promise<ProdutoVersao | null>
    buscaUltimaVersao: (codigo: string) => Promise<Produto | null>
    buscaCategoria: (categoria: string) => Promise<Array<Produto>>
    buscaListaProduto: () => Promise<Array<Produto>>
    remove: (codigo : string) => void
}