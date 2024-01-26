export class ItemPedido {

    constructor(
        codigoProduto: string, 
        quantidade: number, 
        observacao: string, 
        descricaoProduto: string | null = null,  
        valor: number | null = null
    ){
        this.codigoProduto = codigoProduto
        this.quantidade = quantidade  
        this.observacao = observacao
        this.descricaoProduto = descricaoProduto
        this.valor = valor
    }

    private codigoProduto: string
    public getCodigoProduto(): string {
        return this.codigoProduto
    }

    private descricaoProduto: string | null
    public getDescricaoProduto(): string | null {
        return this.descricaoProduto
    }

    private quantidade: number
    public getQuantidade(): number {
        return this.quantidade
    }

    private valor: number | null
    public getValor(): number | null {
        return this.valor
    }

    private observacao: string
    public getObservacao(): string {
        return this.observacao
    }

    /**
     * 
     * @param comparable 
     * @returns boolean
     */
    public equals(comparable: ItemPedido): boolean {
        /** Não gostei de fazer essa lógica, deve ter alguma forma menos custosa */
        
        const comparable1: any = JSON.parse(JSON.stringify(this))
        const comparable2: any = JSON.parse(JSON.stringify(comparable))

        delete comparable1.versao
        delete comparable2.versao

        return JSON.stringify(comparable1).toLowerCase() === JSON.stringify(comparable2).toLowerCase()
    }
}