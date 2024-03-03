import { AxiosResponse, create } from "axios"

export class PedidosExternal {
    constructor() {}

    webhookPagamento(codigoPedido: string): Promise<AxiosResponse> {

      const payload = {
        codigoPedido,
        evento: 'PAGO'
      }

      const axios = create({
        baseURL: `http://localhost:3000`,
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return axios.post(
        `/api/pedidos/v1/webhook`,
        payload
      )
    }



}