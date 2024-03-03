import { PagamentoVersao } from "./pagamento.versao"

export enum ParceiroNegocioPagamento {
    MERCADOPAGO = 'MERCADO_PAGO',
}

export enum MeioPagamento {
    PIX = 'PIX',
}

export enum StatusPagamento {
    PENDENTE = "PENDENTE",
    RECEBIDO = "RECEBIDO",
    EXPIRADO = "EXPIRADO"
}
export class Pagamento {

    constructor(cpf: string, nome: string, email: string, valor: number, parcelamento: number, meio: string, identificadorExterno: string, ) {
        this.nome = nome
        this.cpf = cpf  
        this.email = email
        this.valor = valor
        this.parcelamento = parcelamento
        this.meio = meio
        this.identificadorExterno = identificadorExterno
        this.data = new Date()
        this.parceiroNegocio = null
        this.status = null
        this.metadata = null
        this.versao = null
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

    private valor: number
    public getValor(): number {
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

    private identificadorExterno: string
    public getIdentificadorExterno(): string {
        return this.identificadorExterno
    }

    private data: Date
    public getData(): Date {
        return this.data
    }

    private versao: PagamentoVersao | null
    public getVersao(): PagamentoVersao | null {
        return this.versao
    }
    public setVersao(versao: PagamentoVersao): void {
        this.versao = versao
    }    

    private parceiroNegocio: string | null
    public getParceiroNegocio(): string | null {
        return this.parceiroNegocio
    }
    public setParceiroNegocio(parceiroNegocio: string): void {
        this.parceiroNegocio = parceiroNegocio;
    }

    private metadata: Object | null
    public getMetadata(): Object | null {
        return this.metadata
    }
    public setMetadata(metadata: Object | null): void {
        this.metadata = metadata;
    }     

    private status: string | null
    public getStatus(): string | null {
        return this.status
    }
    public setStatus(status: StatusPagamento): void {
        this.status = status;
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