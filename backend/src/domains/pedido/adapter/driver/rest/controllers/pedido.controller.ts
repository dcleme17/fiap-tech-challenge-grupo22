import {NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from "domains/suporte/entities/custom.error";
import { CustomResponse } from "domains/suporte/entities/custom.response";
import { PedidoService } from 'domains/pedido/core/applications/services/pedido.service';
import { Pedido } from 'domains/pedido/core/entities/pedido';

export class PedidoController {

    constructor(private readonly service: PedidoService) {}

    async adiciona(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const {codigoPedido, cpf, data, horaEntrada, horaSaida, valorPedido, status, itensPedidos} = request.body

        try {
            return next(new CustomResponse(200, 'Pedido adicionado', await this.service.adiciona(new Pedido (codigoPedido, cpf, data, horaEntrada, horaSaida, valorPedido, status),itensPedidos )))
        } catch (err){
            return next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
        
    }

    async atualiza(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const {cpf, data, horaEntrada, horaSaida, valorPedido, status, itensPedidos} = request.body

        try {
            next( new CustomResponse(200, 'Produto atualizado', await this.service.atualiza(new Pedido (request.params.codigoPedido, cpf, data, horaEntrada, horaSaida, valorPedido, status),itensPedidos)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
        
    }

    async buscaUltimaVersao(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const {codigoPedido, cpf} = request.body
       
        try {
            next( new CustomResponse(200, 'Pedido adicionado', await this.service.buscaUltimaVersao(codigoPedido)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }        
    }    
}