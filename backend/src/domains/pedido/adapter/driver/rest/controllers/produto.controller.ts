import {NextFunction, Request} from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from "domains/suporte/entities/custom.error";
import { CustomResponse } from "domains/suporte/entities/custom.response";
import { ProdutoUseCases } from 'domains/pedido/core/applications/usecases/produto.usecases';
import { Produto } from 'domains/pedido/core/entities/produto';

export class ProdutoController {

    constructor(private readonly service: ProdutoUseCases) {}

    async adiciona(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            return next(new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array()))
        }
    
        const {codigo, produto, categoria, preco, descricao} = request.body
        
        try {
            return next(new CustomResponse(200, 'Produto adicionado', await this.service.adiciona(new Produto (codigo, produto, categoria, preco, descricao) )))
        } catch (err){
            return next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
        
    }

    async atualiza(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            return next(new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array()))
        }
    
        const {produto, categoria, preco, descricao} = request.body

        try {
            return next( new CustomResponse(200, 'Produto atualizado', await this.service.atualiza(new Produto (request.params.codigo, produto, categoria, preco, descricao))))
        } catch (err){
            return next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
        
    }

    async buscaUltimaVersao(request: Request, next: NextFunction): Promise<void> {
        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                return next(new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array()))
            }
        
            const {codigo} = request.params
                        
            return next( new CustomResponse(200, 'Produto adicionado', await this.service.buscaUltimaVersao(codigo)))
        } catch (err){
            return next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }        
    }  
    
    async buscaProduto(request: Request, next: NextFunction): Promise<void> {
        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                return next(new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array()))
            }

            /** 
             * Isso daqui é uma gambiarra para poder acessar os parametros 
             * passados por query sem precisar fazer cast um por um
             * Obrigado, de nada. 
             * */
            const { categoria } = request.query as any

            if(categoria) {
                return next( new CustomResponse(200, 'Busca de produto por categoria', await this.service.buscaCategoria(categoria)))

            } else {
                return next( new CustomResponse(200, 'Listagem de produto', await this.service.buscaListaProduto()))
            }

        } catch (err){
            return next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        } 

    }  

    async remove(request: Request, next: NextFunction): Promise<void> {
        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                return next(new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array()))
            }
        
            const {codigo} = request.params            
            return next( new CustomResponse(200, 'Produto removido', await this.service.remove(codigo)))
        } catch (err){
            return next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        } 
    }  
}