import { Cliente } from "domains/acesso/entities/cliente";
import {ICliente} from "domains/acesso/controllers/interfaces/cliente.interface";
import {ClienteDatabase} from "domains/acesso/infra/database/cliente.database"
import { CustomError} from "domains/suporte/entities/custom.error"
import { CustomResponse } from "domains/suporte/entities/custom.response";

export class ClienteController implements ICliente {

    async add(cpf: string, nome: string, email: string): Promise<CustomResponse> {

        const cliente = new Cliente(nome, cpf, email);
        const database = new ClienteDatabase()
        
        try{

            const ultimaVersao = await database.buscaUltimaVersao(cpf)

            if (ultimaVersao) {
                throw new CustomError('Já existe cliente para esse CPF', 400, false, [])
            }

            const versao = await database.add(cliente).then()
            return new CustomResponse(201, 'cliente criado', {versao}, false)

        } catch (err) {
            if (err instanceof CustomError) throw err
            
            throw new CustomError('Erro ao gravar cliente', 500, false, [err]);
        }

    }

    async atualiza(cpf: string, nome: string, email: string): Promise<CustomResponse> {

        const cliente = new Cliente(nome, cpf, email);
        const database = new ClienteDatabase()
        
        try{

            const ultimaVersao = await database.buscaUltimaVersao(cpf)

            if (ultimaVersao) {

                if (cliente.equals(ultimaVersao)) {
                    throw new CustomError('Nenhuma informação para atualizar', 400, false, [])
                }
            } else {
                throw new CustomError('Cliente não encontrado', 404, false, [])
            }

            const versao = await database.add(cliente).then()
            return new CustomResponse(200, 'cliente atualizado', {versao}, false)

        } catch (err) {
            if (err instanceof CustomError) throw err
            
            throw new CustomError('Erro ao atualizar cliente', 500, false, [err]);
        }

    }

    async buscaUltimaVersao(cpf: string): Promise<CustomResponse> {
        const database = new ClienteDatabase()
        
        try{
            const ultimaVersao = await database.buscaUltimaVersao(cpf)

            if(ultimaVersao) {
                return new CustomResponse(200, 'Cliente encontrado', ultimaVersao, false)
            } else {
                throw new CustomError('Cliente não encontrado com o CPF informado', 404, false, [])
            }
        } catch (err) {
            if (err instanceof CustomError) throw err
            
            throw new CustomError('Erro ao consultar cliente', 500, false, [err]);
        }            
    }
}