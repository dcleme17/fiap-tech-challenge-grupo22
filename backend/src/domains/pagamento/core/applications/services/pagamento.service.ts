import { CustomError } from "domains/suporte/entities/custom.error"
import { PagamentoDatabase } from "domains/pagamento/adapter/driven/infra/database/pagamento.database";

export class PagamentoService {

    constructor(private readonly database: PagamentoDatabase) {
        this.database = database
    }
}