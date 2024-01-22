import {NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from "domains/suporte/entities/custom.error";
import { CustomResponse } from "domains/suporte/entities/custom.response";
import { ProdutoService } from 'domains/acesso/core/applications/services/produto.service';
import { Produto } from 'domains/acesso/core/entities/produto';

export class ProdutoController {

    constructor(private readonly service: ProdutoService) {}

    async adiciona(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
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
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const {produto, categoria, preco, descricao} = request.body

        try {
            next( new CustomResponse(200, 'Produto atualizado', await this.service.atualiza(new Produto (request.params.codigo, produto, categoria, preco, descricao))))
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
            next( new CustomResponse(200, 'Produto adicionado', await this.service.buscaUltimaVersao(codigo)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }        
    }  
    
    async buscaProduto(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const {categoria} = request.params

        if(categoria.toLowerCase()=='todos') {
            try {
                next( new CustomResponse(200, 'Produto adicionado', await this.service.buscaListaProduto()))
            } catch (err){
                next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
            } 
        } else {
            try {
                next( new CustomResponse(200, 'Produto adicionado', await this.service.buscaCategoria(categoria)))
            } catch (err){
                next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
            } 
        }

               
    }  

    async remove(request: Request, next: NextFunction): Promise<void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const {codigo} = request.params

        try {
            next( new CustomResponse(200, 'Produto removido', await this.service.remove(codigo)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        } 
    }  
}