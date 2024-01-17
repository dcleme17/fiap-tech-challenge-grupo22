import { ItemPedidoVersao } from "./itemPedido.versao"

export class ItemPedido {

    constructor(codigoPedido: string, codigoProduto: string, qtde: string, valor: string, observacao: string, versao: ItemPedidoVersao | null = null) {
        this.codigoPedido = codigoPedido
        this.codigoProduto = codigoProduto
        this.qtde = qtde  
        this.valor = valor
        this.observacao = observacao
        this.versao = versao
    }

    private versao: ItemPedidoVersao | null
    public getVersao(): ItemPedidoVersao | null {
        return this.versao
    }

    private codigoPedido: string
    public getCodigoPedido(): string {
        return this.codigoPedido
    }

    private codigoProduto: string
    public getcodigoProduto(): string {
        return this.codigoProduto
    }

    private qtde: string
    public getqtde(): string {
        return this.qtde
    }

    private valor: string
    public getvalor(): string {
        return this.valor
    }

    private observacao: string
    public getobservacao(): string {
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