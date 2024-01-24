import { MongoDB } from "domains/pagamento/adapter/driven/infra/database/mongodb";
import { IPagamento } from "domains/pagamento/core/applications/ports/pagamento.port";
import { Pagamento } from "domains/pagamento/core/entities/pagamento";
import { PagamentoVersao } from "domains/pagamento/core/entities/pagamento.versao";

export class PagamentoDatabase extends MongoDB implements IPagamento {
    
    constructor() {
        super(process.env.DATABASE_URL!);
    }

    async adiciona(cliente: Pagamento): Promise<PagamentoVersao | null> {
        
        const clienteRef = await this.getCollection('lanchonete', 'clientes').then();
        
        const result = await clienteRef.insertOne({
            cpf: cliente.getCpf(),
            nome: cliente.getNome(),
            email: cliente.getEmail()
        });

        return new PagamentoVersao(result.insertedId.toString(), result.insertedId.getTimestamp())
        
    }
}