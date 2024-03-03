export class PedidoVersao {

    constructor (versao: string, dataCadastro: Date, codigoPedido: string) {
        this._versao = versao
        this._dataCadastro = dataCadastro
        this._codigoPedido = codigoPedido
    }

    private _codigoPedido: string
    private _versao: string
    private _dataCadastro!: Date

    public get versao(): string {
        return this._versao
    }
    public get dataCadastro(): Date {
        return this._dataCadastro
    }

    public get codigoPedido(): string {
        return this._codigoPedido
    }    
}