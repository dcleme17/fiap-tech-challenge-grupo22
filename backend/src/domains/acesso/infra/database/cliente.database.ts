import { Cliente } from "domains/acesso/entities/cliente";
import { MongoDB } from "./mongodb";

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

        const cursor = await clienteRef.find<Cliente>( 
            { $and: 
                [ {cpf}] 
            } , {
                sort: {_id: "desc"}
            }
        ).limit(1)

        let cliente: Cliente;

        for await (const doc of cursor) {
            cliente = doc;
        } 

        return cliente!

    }     
}