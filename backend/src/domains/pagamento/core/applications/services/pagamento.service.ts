import { CustomError } from "domains/suporte/entities/custom.error"
import { PagamentoDatabase } from "domains/pagamento/adapter/driven/infra/database/pagamento.database";
import { PagamentoVersao } from "../../entities/pagamento.versao";
import { Pagamento } from "../../entities/pagamento";

export class PagamentoService {

    constructor(private readonly database: PagamentoDatabase) {
        this.database = database
    }

    /** Ainda não precisa ser implementado */
    async pagar(pagamento: Pagamento): Promise<PagamentoVersao> {
        return new PagamentoVersao("123", new Date())
    }
}