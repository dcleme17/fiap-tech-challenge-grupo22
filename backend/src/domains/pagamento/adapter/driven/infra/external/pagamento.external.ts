import { Pagamento } from "domains/pagamento/core/entities/pagamento";
import { MercadoPagoExternal } from "./mercadopago/mercadopago";
import QRCode from "qrcode"
import { PedidosExternal } from "./pedidos/pedidos";

export class PagamentoExternal {

    constructor() {}
    
    async gerarCobrancaPix(pagamento: Pagamento): Promise<Object | null> {    

        const external = new MercadoPagoExternal();

        const responsePedido = await external.criarPedido(
            `Pedido de ${pagamento.getCpf()} em ${pagamento.getData()}`,
            pagamento.getVersao()?.versao || '',
            pagamento.getValor().valueOf()
        );

        const {in_store_order_id, qr_data} = responsePedido.data;

        const QRCodeUrl = await QRCode.toDataURL(qr_data).then()

        return {
            idExterno: in_store_order_id,
            QRCodeUrl
        }
    }

    async webhookPagamentos(pagamento: Pagamento): Promise<Object | null> {    

        const external = new PedidosExternal();

        const response = await external.webhookPagamento(
            pagamento.getIdentificadorExterno()
        );

        return response
    }
}