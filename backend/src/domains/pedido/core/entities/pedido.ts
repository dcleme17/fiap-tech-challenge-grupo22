import { PedidoVersao } from "./pedido.versao"

export class Pedido {

    constructor(codigoPedido: string, cpf: string, data: string, horaEntrada: string, horaSaida: string, valorPedido: string, status: string, versao: PedidoVersao | null = null) {
        this.codigoPedido = codigoPedido
        this.cpf = cpf
        this.data = data  
        this.horaEntrada = horaEntrada
        this.horaSaida = horaSaida
        this.valorPedido = valorPedido
        this.status = status
        this.versao = versao
    }

    private versao: PedidoVersao | null
    public getVersao(): PedidoVersao | null {
        return this.versao
    }

    private codigoPedido: string
    public getCodigoPedido(): string {
        return this.codigoPedido
    }

    private cpf: string
    public getCpf(): string {
        return this.cpf
    }

    private data: string
    public getData(): string {
        return this.data
    }

    private horaEntrada: string
    public gethoraEntrada(): string {
        return this.horaEntrada
    }

    private horaSaida: string
    public gethoraSaida(): string {
        return this.horaSaida
    }

    private valorPedido: string
    public getValorPedido(): string {
        return this.valorPedido
    }

    private status: string
    public getStatus(): string {
        return this.status
    }
    /**
     * 
     * @param comparable 
     * @returns boolean
     */
    public equals(comparable: Pedido): boolean {
        /** Não gostei de fazer essa lógica, deve ter alguma forma menos custosa */
        
        const comparable1: any = JSON.parse(JSON.stringify(this))
        const comparable2: any = JSON.parse(JSON.stringify(comparable))

        delete comparable1.versao
        delete comparable2.versao

        return JSON.stringify(comparable1).toLowerCase() === JSON.stringify(comparable2).toLowerCase()
    }
}