import { Cliente } from "../../models/cliente";
import { MongoDB } from "./mongodb";

export class ClienteRepository extends MongoDB {
    constructor() {
        super(process.env.DATABASE_URL!);
    }

    async add(cliente: Cliente): Promise<string> {

        const clienteRef = await this.getCollection('lanchonete', 'clientes').then();

        const result = await clienteRef.insertOne(cliente);

        return result.insertedId.toString()

    }
}