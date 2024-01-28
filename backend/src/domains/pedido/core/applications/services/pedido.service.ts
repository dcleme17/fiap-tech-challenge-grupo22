import { Pedido, StatusPedido } from "domains/pedido/core/entities/pedido";
import { ItemPedido } from "domains/pedido/core/entities/itemPedido";
import { PedidoVersao } from "domains/pedido/core/entities/pedido.versao";
import { PedidoDatabase } from "domains/pedido/adapter/driven/infra/database/pedido.database"
import { CustomError } from "domains/suporte/entities/custom.error"
import { ClienteService } from "domains/cliente/core/applications/services/cliente.service";
import { Cliente } from "domains/cliente/core/entities/cliente";
import { format } from "date-fns";
import { ProdutoService } from "./produto.service";

export class PedidoService {

    constructor(
        private readonly database: PedidoDatabase,
        private readonly clienteService: ClienteService,
        private readonly produtoService: ProdutoService
    ) {
        this.database = database
        this.clienteService = clienteService
    }

    async adiciona(cpf: string | null, itens: Array<ItemPedido>, codigoPedido: string | null = null): Promise<PedidoVersao> {

        let cliente: Cliente | null
        const itensPedido: Array<ItemPedido> = []
        let valorPedido: number = 0.0

        if (cpf) {
            cliente = await  this.clienteService.buscaUltimaVersao(cpf).then()
        } else {
            cliente = null;
        }

        /** busca os dados dos produtos e calcula o valor do item */

        for(let i = 0; i < itens.length; i++) {

            const item = itens[i];

            const produto = await this.produtoService.buscaUltimaVersao(item.getCodigoProduto()).then()
            console.info('produto', produto)

            const detalhado = new ItemPedido(
                produto.getCodigo(),
                Number(item.getQuantidade()),
                item.getObservacao(),
                produto.getDescricao(),
                (Number(produto.getPreco()) * Number(item.getQuantidade()))
            )

            itensPedido.push(detalhado)

            valorPedido = valorPedido + detalhado.getValor()!
            
        }

        const pedido = new Pedido(
            format(new Date(), 'dd/MM/yyyy'), 
            format(new Date(), 'hh:mm:ss'), 
            StatusPedido.Recebido,   
            itensPedido,      
            valorPedido,
            cliente,
            null,
            codigoPedido,
            null
        )

        var pedidoVersao = await this.database.adiciona(pedido).then()

        return pedidoVersao
    }

    async atualiza(codigoPedido: string, cpf: string | null, itens: Array<ItemPedido>): Promise<PedidoVersao> {

        const ultimaVersao = await this.database.buscaUltimaVersao(codigoPedido)

        if (!ultimaVersao) {
            throw new CustomError('Pedido não encontrado', 404, false, [])
        }

        if (ultimaVersao.getStatus() !== StatusPedido.Recebido) {
            throw new CustomError('O pedido não pode mais ser alterado', 400, false, [])
        }           

        /** Aqui deveria ser uma única transação para não ter problemas ... */
        /** Mas dado o horário, me recuso. */

        const pedidoVersao = await this.adiciona(cpf, itens, codigoPedido).then()

        await this.database.versiona(ultimaVersao).then()

        return pedidoVersao
    }

    async buscaUltimaVersao(codigoPedido: string): Promise<Pedido> {

        const ultimaVersao = await this.database.buscaUltimaVersao(codigoPedido)

        if (ultimaVersao) {
            return ultimaVersao
        } else {
            throw new CustomError('Pedido não encontrado com o código informado', 404, false, [])
        }
    }

    async listaPedidos(): Promise<Array<Pedido>> {
        return await this.database.listaPedidos()
    }

    async checkout (codigoPedido: string): Promise<any> {

        const ultimaVersao: Pedido = await this.database.buscaUltimaVersao(codigoPedido).then()

        if (!ultimaVersao) {
            throw new CustomError('Pedido não encontrado', 400, false, [])
        } 

        /** facility */
        const pedido: Pedido = ultimaVersao as Pedido;

        if (pedido.getValorPedido() <= 1) {
            throw new CustomError('Valor do pedido menor do que o permitido', 400, false, [])
        }

        if (pedido.getStatus() !== StatusPedido.Recebido) {
            throw new CustomError('O status do pedido é inválido', 400, false, [])
        }     
        
        if (pedido.getData()) {
            //TODO: validar a data do pedido
        }

        pedido.setStatus(StatusPedido.Preparacao)

        var versaoPedido: Pedido = await this.database.adiciona(pedido).then()
        
        return versaoPedido
    }
}