import {NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { CustomError } from "domains/suporte/entities/custom.error";
import { CustomResponse } from "domains/suporte/entities/custom.response";
import { ClienteUseCases } from 'domains/cliente/core/applications/usecases/cliente.usecases';
import { Cliente } from 'domains/cliente/core/entities/cliente';

export class ClienteController {

    constructor(private readonly service: ClienteUseCases) {}

    async adiciona(request: Request, next: NextFunction): Promise<void> {
        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }
        
            const {cpf, nome, email} = request.body
                        
            return next(new CustomResponse(200, 'Cliente adicionado', await this.service.adiciona(new Cliente (cpf, nome, email))))
        } catch (err){
            return next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
        
    }
    async atualiza(request: Request, next: NextFunction): Promise<void> {
        try {
            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }
        
            const {nome, email} = request.body

            next( new CustomResponse(200, 'Cliente atualizado', await this.service.atualiza(new Cliente (request.params.cpf, nome, email))))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }
        
    }

    async buscaUltimaVersao(request: Request, next: NextFunction): Promise<void> {
        try {

            const result = validationResult(request)

            if (!result.isEmpty()) {
                throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
            }
        
            const {cpf} = request.params            
            next( new CustomResponse(200, 'Cliente encontrado', await this.service.buscaUltimaVersao(cpf)))
        } catch (err){
            next(new CustomError('Ops, algo deu errado na operação', 500, false, err))
        }        
    }    
}