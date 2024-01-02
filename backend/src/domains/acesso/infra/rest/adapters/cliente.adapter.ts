import {ClienteController } from "domains/acesso/controllers/cliente.controller"
import {Request} from 'express';
import { param, validationResult } from 'express-validator';
import { CustomError } from "domains/suporte/entities/custom.error";
import { CustomResponse } from "domains/suporte/entities/custom.response";

export class ClienteAdapter {
    async add(request: Request): Promise<CustomResponse> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const controller = new ClienteController()

        const {cpf, nome, email} = request.body
        
        return await controller.add(cpf, nome, email)
    }
    async atualiza(request: Request): Promise<CustomResponse> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const controller = new ClienteController()

        const {nome, email} = request.body
        
        return await controller.atualiza(request.params.cpf, nome, email)
    }

    async buscaUltimaVersao(request: Request): Promise<CustomResponse> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const controller = new ClienteController()

        const {cpf} = request.params
        
        return await controller.buscaUltimaVersao(cpf)
    }    
}