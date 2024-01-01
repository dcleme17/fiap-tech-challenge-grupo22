import { Cliente } from "../models/cliente";
import {ICliente} from "./interfaces/icliente";
import {ClienteRepository} from "../repository/database/cliente.repository"
import { CustomError} from "../../comum/custom.error"

export class ClienteController implements ICliente {

    async add(cpf: string, nome: string, email: string): Promise<any> {

        const cliente = new Cliente(nome, cpf, email);
        const repository = new ClienteRepository()
        
        try{
            const insertedId = await repository.add(cliente).then()
            return {insertedId}
        } catch (err) {
            throw new CustomError('Erro ao gravar cliente', 500, false, [err]);
        }

    }
    pesquisaPorDocumento: (cpf: string) => Cliente;
   
}