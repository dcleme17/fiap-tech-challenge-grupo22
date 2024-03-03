import {NextFunction, Request} from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from "domains/suporte/entities/custom.error";
import { CustomResponse } from "domains/suporte/entities/custom.response";
import { PedidoService } from 'domains/pedido/core/applications/services/pedido.service';
import { ItemPedido } from 'domains/pedido/core/entities/itemPedido';

export class PedidoController {

    constructor(private readonly service: PedidoService) {}

    async adiciona(request: Request, next: NextFunction): Promise<void> {
        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }
        
            const {cpf, itens} = request.body
            
            return next(new CustomResponse(201, 'Pedido adicionado', await this.service.adiciona(cpf, this.preparaItesPedido(itens) )))
        } catch (err){
            console.error(err)
            return next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
        
    }

    async atualiza(request: Request, next: NextFunction): Promise<void> {

        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }
        
            const {cpf, itens} = request.body        
            const {codigoPedido} = request.params  

            next( new CustomResponse(200, 'Pedido atualizado', await this.service.atualiza(codigoPedido, cpf, this.preparaItesPedido(itens))))
        } catch (err){
            console.error(err)
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
        
    }

    async buscaUltimaVersao(request: Request, next: NextFunction): Promise<void> {
        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }
        
            const {codigoPedido} = request.body            
            next( new CustomResponse(200, 'Pedido encontrado', await this.service.buscaUltimaVersao(codigoPedido)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }        
    }  
    
    async listaPedidos(_request: Request, next: NextFunction): Promise<void> {
        try {         
            next( new CustomResponse(200, 'Pedido encontrado', await this.service.listaPedidos()))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }        
    }  

    async webhook(request: Request, next: NextFunction): Promise<void> {
        try {       
            
            const { codigoPedido, evento } = request.body

            next( new CustomResponse(201, 'Webhook Processado', await this.service.webhook(codigoPedido, evento)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }        
    }      
    
    async checkoutPIX(request: Request, next: NextFunction): Promise<void> {

        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }  

            next(new CustomResponse(200, 'Pedido recebido', await this.service.checkout(request.params.codigoPedido)))
        } catch (err){
            console.error(err)
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
    } 

    private preparaItesPedido(itens: Array<any>) {
        const itensPedido: Array<ItemPedido> = []

        for(let i = 0; i < itens.length; i++) {

            const {
                codigoProduto,
                quantidade,
                observacao,
            } = itens[i]

            itensPedido.push(new ItemPedido(
                codigoProduto,
                quantidade,
                observacao
            ))
        }

        return itensPedido
    }
}