import { Pagamento } from "domains/pagamento/core/entities/pagamento"
import { PagamentoVersao } from "domains/pagamento/core/entities/pagamento.versao"

export interface IPagamento {
    criar: (pagamento: Pagamento) => Promise<PagamentoVersao | null>
    buscaUltimaVersao: (identificadorExterno: string, cpf: string) => Promise<Pagamento | null>
}