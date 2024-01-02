import { Cliente } from "domains/acesso/core/entities/cliente";
import { ClienteVersao } from "domains/acesso/core/entities/cliente.versao";
import { ClienteDatabase } from "domains/acesso/adapter/driven/infra/database/cliente.database"
import { CustomError } from "domains/suporte/entities/custom.error"

export class ClienteService {

    constructor(private readonly database: ClienteDatabase) {
        this.database = database
    }

    async adiciona(cliente: Cliente): Promise<ClienteVersao> {

        const ultimaVersao = await this.database.buscaUltimaVersao(cliente.getCpf())

        if (ultimaVersao) {
            throw new CustomError('Já existe cliente para esse CPF', 400, false, [])
        }

        return await this.database.adiciona(cliente).then()
    }

    async atualiza(cliente: Cliente): Promise<ClienteVersao> {

        const ultimaVersao = await this.database.buscaUltimaVersao(cliente.getCpf())

        if (ultimaVersao) {

            if (cliente.equals(ultimaVersao)) {
                throw new CustomError('Nenhuma informação para atualizar', 400, false, [])
            }
        } else {
            throw new CustomError('Cliente não encontrado', 404, false, [])
        }

        return await this.database.atualiza(cliente).then()
    }

    async buscaUltimaVersao(cpf: string): Promise<Cliente> {

        const ultimaVersao = await this.database.buscaUltimaVersao(cpf)

        if (ultimaVersao) {
            return ultimaVersao
        } else {
            throw new CustomError('Cliente não encontrado com o CPF informado', 404, false, [])
        }
    }
}