import { Cliente } from "domains/cliente/core/entities/cliente"
import { PedidoVersao } from "./pedido.versao"
import { ItemPedido } from "./itempedido"

export enum StatusPedido {
    Recebido = 'Recebido',
    Preparacao = 'Em Preparação',
    Pagamento = 'Aguardando Pagamento',
    Pronto = 'Pronto',
    Finalizado = 'Finalizado',
    Cancelado = 'Cancelado'
  }

export class Pedido {

    constructor(
        data: string, 
        horaEntrada: string, 
        status: StatusPedido | null,
        itens: Array<ItemPedido>, 
        valorPedido: number, 
        cliente: Cliente | null = null, 
        horaSaida: string | null = null, 
        codigoPedido: string | null = null, 
        versao: PedidoVersao | null = null,
    ){
        this.data = data  
        this.horaEntrada = horaEntrada
        this.status = status
        this.itens = itens
        this.valorPedido = valorPedido
        this.cliente = cliente
        this.horaSaida = horaSaida
        this.codigoPedido = codigoPedido
        this.versao = versao
    }

    private data: string
    public getData(): string {
        return this.data
    }

    private horaEntrada: string
    public getHoraEntrada(): string {
        return this.horaEntrada
    }

    private status: StatusPedido | null
    public getStatus(): StatusPedido | null {
        return this.status
    }

    public setStatus(status: StatusPedido | null): void {
        this.status = status
    }

    private itens: Array<ItemPedido>
    public getItens(): Array<ItemPedido> {
        return this.itens
    }

    private valorPedido: number
    public getValorPedido(): number {
        return this.valorPedido
    }

    private cliente: Cliente | null
    public getCliente(): Cliente | null {
        return this.cliente
    }

    private horaSaida: string | null
    public getHoraSaida(): string | null{
        return this.horaSaida
    }

    private codigoPedido: string | null
    public getCodigoPedido(): string | null{
        return this.codigoPedido
    }

    private versao: PedidoVersao | null
    public getVersao(): PedidoVersao | null {
        return this.versao
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