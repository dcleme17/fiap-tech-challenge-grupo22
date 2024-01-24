import {NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from "domains/suporte/entities/custom.error";
import { CustomResponse } from "domains/suporte/entities/custom.response";
import { PagamentoService } from 'domains/pagamento/core/applications/services/pagamento.service';
import { Pagamento } from 'domains/pagamento/core/entities/pagamento';

export class PagamentoController {

    constructor(private readonly service: PagamentoService) {}

    async adiciona(request: Request, next: NextFunction): Promise<void> {
        
    }
}