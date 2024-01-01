import { Cliente } from "../../models/cliente"

export interface ICliente {
    add: (cpf: string, nome: string, email: string) => Promise<string> | void
    pesquisaPorDocumento: (cpf: string) => Cliente | void
}