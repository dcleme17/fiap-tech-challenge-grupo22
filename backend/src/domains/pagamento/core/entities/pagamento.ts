import { Double } from "mongodb"
import { PagamentoVersao } from "./pagamento.versao"

export class Pagamento {

    constructor(cpf: string, nome: string, email: string, valor: Double, parcelamento: number, meio: string, data: Date, versao: PagamentoVersao | null = null) {
        this.nome = nome
        this.cpf = cpf  
        this.email = email
        this.valor = valor
        this.parcelamento = parcelamento
        this.meio = meio
        this.data = data
        this.versao = versao
    }

    private versao: PagamentoVersao | null
    public getVersao(): PagamentoVersao | null {
        return this.versao
    }

    private nome: string
    public getNome(): string {
        return this.nome
    }
    
    private cpf: string
    public getCpf(): string {
        return this.cpf
    }

    private email: string
    public getEmail(): string {
        return this.email
    }

    private valor: Double
    public getValor(): Double {
        return this.valor
    } 

    private parcelamento: number
    public getParcelamento(): number {
        return this.parcelamento
    }

    private meio: string
    public getMeio(): string {
        return this.meio
    }

    private data: Date
    public getData(): Date {
        return this.data
    }

    /**
     * 
     * @param comparable 
     * @returns boolean
     */
    public equals(comparable: Pagamento): boolean {
        /** Não gostei de fazer essa lógica, deve ter alguma forma menos custosa */
        
        const comparable1: any = JSON.parse(JSON.stringify(this))
        const comparable2: any = JSON.parse(JSON.stringify(comparable))

        delete comparable1.versao
        delete comparable2.versao

        return JSON.stringify(comparable1).toLowerCase() === JSON.stringify(comparable2).toLowerCase()
    }
}