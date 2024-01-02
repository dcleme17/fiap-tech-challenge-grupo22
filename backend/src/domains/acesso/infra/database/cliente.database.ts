import { Cliente } from "domains/acesso/entities/cliente";
import { MongoDB } from "domains/acesso/infra/database/mongodb";

export class ClienteDatabase extends MongoDB {
    
    constructor() {
        super(process.env.DATABASE_URL!);
    }

    async add(cliente: Cliente): Promise<string> {

        const clienteRef = await this.getCollection('lanchonete', 'clientes').then();

        const result = await clienteRef.insertOne(cliente);

        return result.insertedId.toString()

    }

    async buscaUltimaVersao(cpf: string): Promise<Cliente | null>{

        const clienteRef = await this.getCollection('lanchonete', 'clientes').then()

        const cursor = clienteRef.find( 
            { $and: 
                [ {cpf}] 
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

        return  new Cliente(
            data?.nome,
            data?.cpf,
            data?.email
        )
        .setId(data?._id.toString()!)
        .setDataCadastro(data?._id.getTimestamp())

    }     
}