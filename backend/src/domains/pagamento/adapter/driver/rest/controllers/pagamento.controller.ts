import {NextFunction, Request, Response} from 'express';
import { PagamentoUseCases } from 'domains/pagamento/core/applications/usecases/pagamento.usecases';
import { CustomError } from 'domains/suporte/entities/custom.error';
import { CustomResponse } from 'domains/suporte/entities/custom.response';
import { validationResult } from 'express-validator';
import { Pagamento } from 'domains/pagamento/core/entities/pagamento';

export class PagamentoController {

    constructor(private readonly service: PagamentoUseCases) {}

    async webhookMercadoPago(request: Request, next: NextFunction): Promise<void> {

        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }  

            const {action, id } = request.body

            next(new CustomResponse(201, 'Webhook Processado', await this.service.webhookPagamentos(id, action)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
    }
}