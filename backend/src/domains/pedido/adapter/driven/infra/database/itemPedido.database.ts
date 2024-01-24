import { ItemPedido } from "domains/pedido/core/entities/itemPedido";
import { MongoDB } from "domains/pedido/adapter/driven/infra/database/mongodb";
import { IItemPedido } from "domains/pedido/core/applications/ports/itemPedido.port";
import { ItemPedidoVersao } from "domains/pedido/core/entities/itemPedido.versao";

export class ItemPedidoDatabase extends MongoDB implements IItemPedido {
    
    constructor() {
        super(process.env.DATABASE_URL!);
    }
    
    async adiciona(itemPedido: ItemPedido): Promise<ItemPedidoVersao | null> {
        
        const itemPedidoRef = await this.getCollection('lanchonete', 'itemPedido').then();
        
        const result = await itemPedidoRef.insertOne({
            codigoPedido: itemPedido.getCodigoPedido(),
            codigoProduto: itemPedido.getCodigoProduto(),
            descricaoProduto: itemPedido.getDescricaoProduto(),
            qtde: itemPedido.getQtde(),
            valor: itemPedido.getValor(),
            observacao: itemPedido.getObservacao(),
            versao: itemPedido.getVersao() 
        });

        return new ItemPedidoVersao(result.insertedId.toString(), result.insertedId.getTimestamp())
        
    }
    
    async atualiza(ItemPedido: ItemPedido): Promise<ItemPedidoVersao | null> {
        return this.adiciona(ItemPedido);
    }

    async buscaUltimaVersao(codigoPedido: string): Promise<ItemPedido | null>{

        const pedidoRef = await this.getCollection('lanchonete', 'ItemPedido').then()

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

        return new ItemPedido(
            data?.codigoPedido,
            data?.codigoProduto,
            data?.descricaoProduto,
            data?.qtde,
            data?.valor,
            data?.observacao,
            new ItemPedidoVersao(
                data?._id.toString(),
                data?._id.getTimestamp()
            )
        )
    }     
}