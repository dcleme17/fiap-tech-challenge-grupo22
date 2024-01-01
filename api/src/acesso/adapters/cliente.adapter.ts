import {ClienteController } from "../controllers/cliente.controller"
import {Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { CustomError } from "../../comum/custom.error";

export class ClienteAdapter {
    async add(request: Request, response: Response, next: NextFunction): Promise<any | void> {
        const result = validationResult(request)

        if (!result.isEmpty()) {
            throw new CustomError('Parâmetros inválidos. Por favor, verifique as informações enviadas.', 400, false, result.array())
        }
    
        const controller = new ClienteController()

        const {cpf, nome, email} = request.body
        
        return await controller.add(cpf, nome, email)
    }
}