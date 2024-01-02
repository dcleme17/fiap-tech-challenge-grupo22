import { CustomResponse } from "../../../suporte/entities/custom.response"

export interface ICliente {
    add: (cpf: string, nome: string, email: string) => Promise<CustomResponse> | void
    buscaUltimaVersao: (cpf: string) => Promise<CustomResponse> | void
}