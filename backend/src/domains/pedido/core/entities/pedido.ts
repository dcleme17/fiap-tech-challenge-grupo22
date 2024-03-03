import { Cliente } from "domains/cliente/core/entities/cliente"
import { PedidoVersao } from "./pedido.versao"
import { ItemPedido } from "./itemPedido"
import { Pagamento } from "domains/pagamento/core/entities/pagamento"

export enum EventosPedido {
    CRIADO = "CRIADO",
    PAGO = "PAGO",
    PREPARADO = "PREPARADO",
    EXPIRADO = "EXPIRADO"
}

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
    ){
        this.data = data  
        this.horaEntrada = horaEntrada
        this.status = status
        this.itens = itens
        this.valorPedido = valorPedido
        this.cliente = null
        this.horaSaida = null
        this.codigoPedido = null
        this.pagamento = null
        this.versao = null
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
    public setCliente(cliente: Cliente) {
        this.cliente = cliente
    }

    private horaSaida: string | null
    public getHoraSaida(): string | null{
        return this.horaSaida
    }    
    public setHoraSaida(horaSaida: string) {
        this.horaSaida = horaSaida
    }

    private codigoPedido: string | null
    public getCodigoPedido(): string | null{
        return this.codigoPedido
    }
    public setCodigoPedido(codigoPedido: string) {
        this.codigoPedido = codigoPedido
    }

    private pagamento: Pagamento | null
    public getPagamento(): Pagamento | null{
        return this.pagamento
    }
    public setPagamento(pagamento: Pagamento) {
        this.pagamento = pagamento
    }

    private versao: PedidoVersao | null
    public getVersao(): PedidoVersao | null {
        return this.versao
    }    
    public setVersao(versao: PedidoVersao) {
        this.versao = versao
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