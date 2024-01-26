import {NextFunction, Request, Response} from 'express';
import { PagamentoService } from 'domains/pagamento/core/applications/services/pagamento.service';
import { CustomError } from 'domains/suporte/entities/custom.error';
import { CustomResponse } from 'domains/suporte/entities/custom.response';
import { validationResult } from 'express-validator';
import { Pagamento } from 'domains/pagamento/core/entities/pagamento';

export class PagamentoController {

    constructor(private readonly service: PagamentoService) {}

    async pagar(request: Request, next: NextFunction): Promise<void> {

        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }  

            const {
                nome,
                cpf,
                email,
                valor,
                parcelamento,
                meio,
                data,
                versao
            } = request.body

            next(new CustomResponse(200, 'Pedido recebido', await this.service.pagar(new Pagamento(
                nome,
                cpf,
                email,
                valor,
                parcelamento,
                meio,
                data,
                versao
            ))))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
    }
}