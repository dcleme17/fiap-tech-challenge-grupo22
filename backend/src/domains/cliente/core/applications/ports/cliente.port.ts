import { Cliente } from "domains/cliente/core/entities/cliente"
import { ClienteVersao } from "domains/cliente/core/entities/cliente.versao"

export interface ICliente {
    adiciona: (cliente: Cliente) => Promise<ClienteVersao | null>
    atualiza: (cliente: Cliente) => Promise<ClienteVersao | null>
    buscaUltimaVersao: (cpf: string) => Promise<Cliente | null>
}