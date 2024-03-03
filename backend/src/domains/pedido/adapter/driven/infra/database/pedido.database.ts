import { Pedido } from "domains/pedido/core/entities/pedido";
import { MongoDB} from "domains/suporte/infra/database/mongodb";
import { IPedido } from "domains/pedido/core/applications/ports/pedido.port";
import { PedidoVersao } from "domains/pedido/core/entities/pedido.versao";
import { format } from "date-fns"
import { ObjectId } from "mongodb";
import { Cliente } from "domains/cliente/core/entities/cliente";
import { ClienteVersao } from "domains/cliente/core/entities/cliente.versao";
import { Pagamento } from "domains/pagamento/core/entities/pagamento";
import { PagamentoVersao } from "domains/pagamento/core/entities/pagamento.versao";

export class PedidoDatabase extends MongoDB implements IPedido {

    private COLLECTION = 'pedidos'
    
    constructor() {
        super(process.env.DATABASE_URL!);
    }

    private async numeracaoPedido(data: Date): Promise<string> {

        const operacao = format(data,'yyyyMMdd')
        const ref = await this.getCollection('lanchonete', 'numeracaoPedido').then();

        const numeroPedido = await ref.findOneAndUpdate({operacao: operacao },{ $inc: { seq_value: 1 }}, { upsert : true})

        return `${operacao}_${(numeroPedido?.seq_value || 1).toString().padStart(6, '0')}`
    }
    
    async adiciona(pedido: Pedido): Promise<PedidoVersao> {

        let codigoPedido = null;

        if(pedido.getCodigoPedido()) {
            codigoPedido = pedido.getCodigoPedido()
        } else {
            codigoPedido =  await this.numeracaoPedido(new Date())
        }
        
        const pedidoRef = await this.getCollection('lanchonete', this.COLLECTION).then();
        
        const result = await pedidoRef.insertOne({
            codigoPedido: codigoPedido,
            cliente: pedido.getCliente(),
            data: pedido.getData(),
            horaEntrada: pedido.getHoraEntrada(),
            horaSaida: pedido.getHoraSaida(),
            valor: pedido.getValorPedido(),
            status: pedido.getStatus(),
            itens: pedido.getItens(),
            pagamento: pedido.getPagamento()
        });

        return new PedidoVersao(
            result.insertedId.toString(), 
            result.insertedId.getTimestamp(),
            codigoPedido!)
        
    }
    
    async versiona(pedido: Pedido): Promise<boolean | null> {

        const pedidoRef = await this.getCollection('lanchonete', this.COLLECTION).then();

        const response = await pedidoRef.updateOne({
            _id: new ObjectId(pedido.getVersao()?.versao)
        }, {
            $set: { versionado: true }
        }, { upsert: true }
        )
    
        return response.modifiedCount == 1;
    }

    async buscaUltimaVersao(codigoPedido: string): Promise<Pedido | null>{

        const pedidoRef = await this.getCollection('lanchonete', this.COLLECTION).then()

        const cursor = pedidoRef.find( 
            { $and: 
                [ {codigoPedido}] 
            } , {
                sort: {_id: "desc"}
            }
        ).limit(1)

        let data

        for await (const doc of cursor) {
            data = doc
        }

        if (!data) {
            return null
        }

        return this.dataBaseToType(data)
    }     

    async listaPedidos(): Promise<Array<Pedido>> {

        const pedidos: Array<Pedido> = []

        const pedidoRef = await this.getCollection('lanchonete', this.COLLECTION).then()

        const cursor = pedidoRef.find( 
            { $and: 
                [ {versionado: { $exists: false } }] 
            } , {
                sort: {_id: "asc"}
            }
        )

        for await (const data of cursor) {
            pedidos.push(this.dataBaseToType(data))
        }
        
        return pedidos

    }  

    async checkout(_codigoPedido: string): Promise<any> {
        return null;
    }

    private dataBaseToType(data: any) : Pedido {
        
        const pedido = new Pedido(
            data?.data,
            data?.horaEntrada,
            data?.status,
            data?.itens,
            data?.valor
        )

        const cliente = new Cliente(
            data?.cliente.cpf, 
            data?.cliente.nome, 
            data?.cliente.email,
            new ClienteVersao(
                data?.cliente.versao._versao,
                data?.cliente.versao._dataCadastro
        ))

        pedido.setCliente(cliente)

        const pagamento = new Pagamento(
            data?.pagamento?.cpf,
            data?.pagamento?.nome,
            data?.pagamento?.email,
            data?.pagamento?.valor,
            data?.pagamento?.parcelamento,
            data?.pagamento?.meio,
            data?.pagamento?.identificadorExterno
        )

        pagamento.setMetadata(data?.pagamento?.metadata)
        pagamento.setParceiroNegocio(data?.pagamento?.parceroNegocio)
        pagamento.setStatus(data?.pagamento?.status)

        pagamento.setVersao(new PagamentoVersao(
                data?._id?.toString(), 
                data?._id?.getTimestamp()
        ))   
        
        pedido.setPagamento(pagamento)

        pedido.setHoraSaida(data?.horaSaida)
        pedido.setCodigoPedido(data?.codigoPedido)
        
        pedido.setVersao(new PedidoVersao(
            data?._id.toString(),
            data?._id.getTimestamp(),
            data?.codigoPedido
        ))   

        return pedido
    }
}