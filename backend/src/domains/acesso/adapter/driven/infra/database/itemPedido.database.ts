import { ItemPedido } from "domains/acesso/core/entities/itemPedido";
import { MongoDB } from "domains/acesso/adapter/driven/infra/database/mongodb";
import { IItemPedido } from "domains/acesso/core/applications/ports/itemPedido";
import { ItemPedidoVersao } from "domains/acesso/core/entities/itemPedido.versao";

export class ItemPedidoDatabase extends MongoDB implements IItemPedido {
    
    constructor() {
        super(process.env.DATABASE_URL!);
    }
    
    async adiciona(itemPedido: ItemPedido): Promise<ItemPedidoVersao | null> {
        
        const itemPedidoRef = await this.getCollection('lanchonete', 'itemPedido').then();
        
        const result = await itemPedidoRef.insertOne({
            codigoPedido: itemPedido.getCodigoPedido(),
            codigoProduto: itemPedido.getcodigoProduto(),
            qtde: itemPedido.getqtde(),
            valor: itemPedido.getvalor(),
            observacao: itemPedido.getobservacao(),
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