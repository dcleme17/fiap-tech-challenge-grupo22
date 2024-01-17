import {NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from "domains/suporte/entities/custom.error";
import { CustomResponse } from "domains/suporte/entities/custom.response";
import { ItemPedidoService } from 'domains/acesso/core/applications/services/itemPedido.service';
import { ItemPedido } from 'domains/acesso/core/entities/itemPedido';

export class ItemPedidoController {

    constructor(private readonly service: ItemPedidoService) {}

    async adiciona(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const {codigoPedido, codigoProduto, qtde, valor, observacao} = request.body
        
        try {
            return next(new CustomResponse(200, 'Item Pedido adicionado', await this.service.adiciona(new ItemPedido (codigoPedido, codigoProduto, qtde, valor, observacao) )))
        } catch (err){
            return next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
        
    }

    async atualiza(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const {codigoProduto, qtde, valor, observacao} = request.body

        try {
            next( new CustomResponse(200, 'Produto atualizado', await this.service.atualiza(new ItemPedido (request.params.codigoPedido, codigoProduto, qtde, valor, observacao))))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
        
    }

    async buscaUltimaVersao(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const {codigo} = request.params

        try {
            next( new CustomResponse(200, 'Item do Pedido adicionado', await this.service.buscaUltimaVersao(codigo)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }        
    }    
}