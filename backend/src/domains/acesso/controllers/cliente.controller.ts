import { Cliente } from "domains/acesso/entities/cliente";
import {ICliente} from "domains/acesso/controllers/interfaces/cliente.interface";
import {ClienteRepository} from "domains/acesso/infra/database/cliente.database"
import { CustomError} from "domains/suporte/entities/custom.error"
import { CustomResponse } from "domains/suporte/entities/custom.response";

export class ClienteController implements ICliente {

    async add(cpf: string, nome: string, email: string): Promise<CustomResponse> {

        const cliente = new Cliente(nome, cpf, email);
        const repository = new ClienteRepository()
        
        try{

            const ultimaVersao = await repository.buscaUltimaVersao(cpf)

            if (ultimaVersao) {
                throw new CustomError('cliente já existe', 400, false, [])
            }

            const insertedId = await repository.add(cliente).then()
            return new CustomResponse(201, 'cliente criado', {insertedId}, true)

        } catch (err) {
            if (err instanceof CustomError) throw err
            
            throw new CustomError('Erro ao gravar cliente', 500, false, [err]);
        }

    }

    async buscaUltimaVersao(cpf: string): Promise<CustomResponse> {
        const repository = new ClienteRepository()
        
        try{
            const ultimaVersao = await repository.buscaUltimaVersao(cpf)

            if(ultimaVersao) {
                return new CustomResponse(200, 'Cliente encontrado', ultimaVersao, false)
            } else {
                throw new CustomError('Cliente não encontrado', 404, false, [])
            }
        } catch (err) {
            if (err instanceof CustomError) throw err
            
            throw new CustomError('Erro ao gravar cliente', 500, false, [err]);
        }            
    }
}