export class ProdutoVersao {

    constructor (versao: string, dataCadastro: Date) {
        this._versao = versao
        this._dataCadastro = dataCadastro
    }

    private _versao: string
    private _dataCadastro!: Date

    public get versao(): string {
        return this._versao
    }
    public get dataCadastro(): Date {
        return this._dataCadastro
    }
}