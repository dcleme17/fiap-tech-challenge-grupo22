import { Pagamento } from "domains/pagamento/core/entities/pagamento"
import { PagamentoVersao } from "domains/pagamento/core/entities/pagamento.versao"

export interface IPagamento {
    adiciona: (cliente: Pagamento) => Promise<PagamentoVersao | null>
}