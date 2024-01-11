import { Produto } from "domains/acesso/core/entities/produto";
import { MongoDB } from "domains/acesso/adapter/driven/infra/database/mongodb";
import { IProduto } from "domains/acesso/core/applications/ports/produto.port";
import { ProdutoVersao } from "domains/acesso/core/entities/produto.versao";

export class ProdutoDatabase extends MongoDB implements IProduto {
    
    constructor() {
        super(process.env.DATABASE_URL!);
    }
    
    async adiciona(produto: Produto): Promise<ProdutoVersao | null> {
        
        const produtoRef = await this.getCollection('lanchonete', 'produtos').then();
        
        const result = await produtoRef.insertOne({
            codigo: produto.getCodigo(),
            produto: produto.getProduto(),
            categoria: produto.getCategoria(),
            preco: produto.getPreco(),
            descricao: produto.getDescricao()
        });

        return new ProdutoVersao(result.insertedId.toString(), result.insertedId.getTimestamp())
        
    }
    
    async atualiza(produto: Produto): Promise<ProdutoVersao | null> {
        return this.adiciona(produto);
    }

    async buscaUltimaVersao(codigo: string): Promise<Produto | null>{

        const produtoRef = await this.getCollection('lanchonete', 'produtos').then()

        const cursor = produtoRef.find( 
            { $and: 
                [ {codigo}] 
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

        return  new Produto(
            data?.codigo,
            data?.produto,
            data?.categoria,
            data?.preco,
            data?.descricao,
            new ProdutoVersao(
                data?._id.toString(),
                data?._id.getTimestamp()
            )
        )
    }     
}