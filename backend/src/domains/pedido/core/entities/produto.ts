import { ProdutoVersao } from "./produto.versao"

export class Produto {

    constructor(codigo: string, produto: string, categoria: string, preco: number, descricao: string, versao: ProdutoVersao | null = null) {
        this.produto = produto
        this.categoria = categoria
        this.codigo = codigo  
        this.preco = preco
        this.descricao = descricao
        this.versao = versao
    }

    private versao: ProdutoVersao | null
    public getVersao(): ProdutoVersao | null {
        return this.versao
    }

    private produto: string
    public getProduto(): string {
        return this.produto
    }

    private categoria: string
    public getCategoria(): string {
        return this.categoria
    }
    
    private codigo: string
    public getCodigo(): string {
        return this.codigo
    }

    private preco: number
    public getPreco(): number {
        return this.preco
    }

    private descricao: string
    public getDescricao(): string {
        return this.descricao
    }

    /**
     * 
     * @param comparable 
     * @returns boolean
     */
    public equals(comparable: Produto): boolean {
        /** Não gostei de fazer essa lógica, deve ter alguma forma menos custosa */
        
        const comparable1: any = JSON.parse(JSON.stringify(this))
        const comparable2: any = JSON.parse(JSON.stringify(comparable))

        delete comparable1.versao
        delete comparable2.versao

        return JSON.stringify(comparable1).toLowerCase() === JSON.stringify(comparable2).toLowerCase()
    }
}