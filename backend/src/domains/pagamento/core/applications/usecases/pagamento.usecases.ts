import { CustomError } from "domains/suporte/entities/custom.error"
import { PagamentoDatabase } from "domains/pagamento/adapter/driven/infra/database/pagamento.database";
import { PagamentoVersao } from "../../entities/pagamento.versao";
import { MeioPagamento, Pagamento, ParceiroNegocioPagamento, StatusPagamento } from "../../entities/pagamento";
import { PagamentoExternal } from "domains/pagamento/adapter/driven/infra/external/pagamento.external";
import { StatusPagamentoMercadoPago } from "domains/pagamento/adapter/driven/infra/external/mercadopago/mercadopago";
import { CustomResponse } from "domains/suporte/entities/custom.response";

export class PagamentoUseCases {

    constructor(
        private readonly database: PagamentoDatabase,
        private readonly external: PagamentoExternal) {
        this.database = database
        this.external = external
    }

    async criar(pagamento: Pagamento): Promise<PagamentoVersao | null> {

        let metadata
        
        if (pagamento.getMeio() === MeioPagamento.PIX) {
            pagamento.setParceiroNegocio(ParceiroNegocioPagamento.MERCADOPAGO)
            metadata = await this.external.gerarCobrancaPix(pagamento).then()
        } else {
            throw new CustomError('Meio de recebimento inválido', 400,false, [])
        }

        if (!metadata) throw new CustomError('Não foi possível gerar o meio de recebimento solicitado', 500,false, [])

        pagamento.setMetadata(metadata)
        pagamento.setStatus(StatusPagamento.PENDENTE)

        const pagamentoVersao: PagamentoVersao = await this.database.criar(pagamento).then()

        return pagamentoVersao
    }

    async buscaUltimaVersao(identificadorExterno: string): Promise<Pagamento> {

        const ultimaVersao = await this.database.buscaUltimaVersao(identificadorExterno)

        if (ultimaVersao) {
            return ultimaVersao
        } else {
            throw new CustomError('Pagamento não encontrado com o código informado', 404, false, [])
        }
    }   

    async webhookPagamentos(identificadorExterno: string, status: string): Promise<any>{

        if(status !== StatusPagamentoMercadoPago.PAGAMENTO) {
            return new CustomResponse(200, 'Evento Ignorado', null, false)
        }

        const pagamento = await this.database.buscaUltimaVersao(identificadorExterno).then()

        console.info(pagamento)

        if (pagamento?.getStatus() !== StatusPagamento.PENDENTE) {
            return new CustomError('O Pagamento não está com o status válido para baixa', 400, false, [])
        }

        pagamento.setStatus(StatusPagamento.RECEBIDO)

        const versao: PagamentoVersao = await this.database.criar(pagamento).then()

        await this.database.versiona(pagamento).then()

        await this.external.webhookPagamentos(pagamento).then()

        return versao;

    }

    
} 