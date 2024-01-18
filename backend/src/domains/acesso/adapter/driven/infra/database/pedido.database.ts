import { Pedido } from "domains/acesso/core/entities/pedido";
import { MongoDB } from "domains/acesso/adapter/driven/infra/database/mongodb";
import { IPedido } from "domains/acesso/core/applications/ports/pedido.port";
import { PedidoVersao } from "domains/acesso/core/entities/pedido.versao";
import { ItemPedido } from "domains/acesso/core/entities/itemPedido";
import { IItemPedido } from "domains/acesso/core/applications/ports/itemPedido.port";
import { ItemPedidoVersao } from "domains/acesso/core/entities/itemPedido.versao";

export class PedidoDatabase extends MongoDB implements IPedido {
    
    constructor() {
        super(process.env.DATABASE_URL!);
    }
    
    async adiciona(pedido: Pedido): Promise<PedidoVersao> {
        
        const pedidoRef = await this.getCollection('lanchonete', 'pedido').then();
        
        const result = await pedidoRef.insertOne({
            codigoPedido: pedido.getCodigoPedido(),
            cpf: pedido.getCpf(),
            data: pedido.getData(),
            horaEntrada: pedido.gethoraEntrada(),
            horaSaida: pedido.gethoraSaida(),
            valor: pedido.getValorPedido(),
            status: pedido.getStatus(),
            versao: pedido.getVersao()
        });

        return new PedidoVersao(result.insertedId.toString(), result.insertedId.getTimestamp())
        
    }

    async adicionaItem(itemPedidos : Array<ItemPedido>): Promise<Array<ItemPedidoVersao> | null> {
        
        const itemPedidoRef = await this.getCollection('lanchonete', 'itemPedido').then();
        let itemVersao = []

        const result = await itemPedidoRef.insertMany(itemPedidos)
        console.log("item adicionado")
        itemVersao.push(new ItemPedidoVersao(result.insertedIds.toString(), new Date()))
        return itemVersao
    }
    
    async atualiza(pedido: Pedido): Promise<PedidoVersao | null> {
        return this.adiciona(pedido);
    }

    async buscaUltimaVersao(codigoPedido: string): Promise<Pedido | null>{

        const pedidoRef = await this.getCollection('lanchonete', 'pedido').then()

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

        return new Pedido(
            data?.codigoPedido,
            data?.cpf,
            data?.data,
            data?.horaEntrada,
            data?.horaSaida,
            data?.valorPedido,
            data?.status,
            new PedidoVersao(
                data?._id.toString(),
                data?._id.getTimestamp()
            )
        )
    }     
}