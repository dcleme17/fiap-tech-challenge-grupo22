import { EventosPedido, Pedido, StatusPedido } from "domains/pedido/core/entities/pedido";
import { ItemPedido } from "domains/pedido/core/entities/itemPedido";
import { PedidoVersao } from "domains/pedido/core/entities/pedido.versao";
import { PedidoDatabase } from "domains/pedido/adapter/driven/infra/database/pedido.database"
import { CustomError } from "domains/suporte/entities/custom.error"
import { ClienteUseCases } from "domains/cliente/core/applications/usecases/cliente.usecases";
import { Cliente } from "domains/cliente/core/entities/cliente";
import { format } from "date-fns";
import { ProdutoUseCases } from "./produto.usecases";
import { PagamentoUseCases } from "domains/pagamento/core/applications/usecases/pagamento.usecases";
import { MeioPagamento, Pagamento, StatusPagamento } from "domains/pagamento/core/entities/pagamento";

export class PedidoUseCases {

    constructor(
        private readonly database: PedidoDatabase,
        private readonly clienteUseCases: ClienteUseCases,
        private readonly produtoService: ProdutoUseCases,
        private readonly pagamentoUseCases: PagamentoUseCases
    ) {
        this.database = database
        this.clienteUseCases = clienteUseCases
        this.pagamentoUseCases = pagamentoUseCases
    }

    async adiciona(cpf: string | null, itens: Array<ItemPedido>, codigoPedido: string | null = null): Promise<PedidoVersao> {

        let cliente: Cliente | null
        const itensPedido: Array<ItemPedido> = []
        let valorPedido: number = 0.0

        if (cpf) {
            cliente = await this.clienteUseCases.buscaUltimaVersao(cpf).then()
        } else {
            cliente = null;
        }

        /** busca os dados dos produtos e calcula o valor do item */

        for(let i = 0; i < itens.length; i++) {

            console.log("itens[i]: " + JSON.stringify(itens[i]))
            const item = itens[i];
            const produto = await this.produtoService.buscaUltimaVersao(item.getCodigoProduto()).then()

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
            valorPedido
        )
 
        pedido.setCliente(cliente!)
        pedido.setCodigoPedido(codigoPedido!)

        var pedidoVersao: PedidoVersao = await this.database.adiciona(pedido).then()

        return pedidoVersao
    }

    async alteraStatus(cpf: string | null, itens: Array<ItemPedido>, codigoPedido: string | null = null, status: StatusPedido): Promise<PedidoVersao> {

        let cliente: Cliente | null
        const itensPedido: Array<ItemPedido> = []
        let valorPedido: number = 0.0

        if (cpf) {
            cliente = await this.clienteUseCases.buscaUltimaVersao(cpf).then()
        } else {
            cliente = null;
        }

        /** busca os dados dos produtos e calcula o valor do item */

        for(let i = 0; i < itens.length; i++) {

            console.log("itens[i]: " + JSON.stringify(itens[i]))
            const item = itens[i];
            const produto = await this.produtoService.buscaUltimaVersao(item.getCodigoProduto()).then()

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
            status,   
            itensPedido,      
            valorPedido
        )
 
        pedido.setCliente(cliente!)
        pedido.setCodigoPedido(codigoPedido!)

        var pedidoVersao: PedidoVersao = await this.database.adiciona(pedido).then()

        return pedidoVersao
    }

    private preparaItesPedido(itens: Array<any>) {
        const itensPedido: Array<ItemPedido> = []

        for(let i = 0; i < itens.length; i++) {

            const {
                codigoProduto,
                quantidade,
                observacao,
            } = itens[i]

            itensPedido.push(new ItemPedido(
                codigoProduto,
                quantidade,
                observacao
            ))
        }

        return itensPedido
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
 
    async atualizaStatus(codigoPedido: string, statusPedido: string): Promise<PedidoVersao> {

        if (!Pedido.isStatusValid(statusPedido)) {
            throw new CustomError('Status do Pedido Inválido', 404, false, [])
        }
        const ultimaVersao = await this.database.buscaUltimaVersao(codigoPedido)

        if (!ultimaVersao) {
            throw new CustomError('Pedido não encontrado', 404, false, [])
        }

        if (ultimaVersao.getStatus() !== StatusPedido.Recebido) {
            throw new CustomError('O pedido não pode mais ser alterado', 400, false, [])
        }      

        var cpf = ultimaVersao.getCliente()?.getCpf()!;
        var itens = ultimaVersao.getItens();

        /** Aqui deveria ser uma única transação para não ter problemas ... */
        /** Mas dado o horário, me recuso. */

        const pedidoVersao = await this.alteraStatus(cpf, this.preparaItesPedido(itens), codigoPedido, statusPedido as StatusPedido).then()

        await this.database.versiona(ultimaVersao).then()

        return pedidoVersao
    }

    async buscaStatus(codigoPedido: string): Promise<StatusPedido > {

        const ultimaVersao = await this.database.buscaUltimaVersao(codigoPedido)

        if (ultimaVersao) {
            return ultimaVersao.getStatus()!;
        } else {
            throw new CustomError('Pedido não encontrado com o código informado', 404, false, [])
        }
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

        const pedido = await this.database.buscaUltimaVersao(codigoPedido).then()

        if (!pedido) {
            throw new CustomError('Pedido não encontrado', 400, false, [])
        } 

        if (pedido.getValorPedido() <= 1) {
            throw new CustomError('Valor do pedido menor do que o permitido', 400, false, [])
        }

        if (pedido.getStatus() !== StatusPedido.Recebido) {
            throw new CustomError('O status do pedido é inválido', 400, false, [])
        }     
        
        if (pedido.getData()) {
            //TODO: validar a data do pedido
        }

        /** Solicitar Pagamento */

        pedido.setStatus(StatusPedido.Pagamento)

        console.info(pedido)

        await this.pagamentoUseCases.criar(new Pagamento(
            pedido.getCliente()?.getCpf()!,
            pedido.getCliente()?.getNome()!,
            pedido.getCliente()?.getEmail()!,
            pedido.getValorPedido(),
            1,
            MeioPagamento.PIX,
            pedido.getCodigoPedido()!
        )).then()

        /** 
         * Normalmente eu faria os dados serem retornados na criação, 
         * porém para manter o padrão criado na fase antetior estou fazendo uma nova consulta.
         * Definitivamente não gosto desse formato por fazer uma query 
         * para trazer dados que já estão em memória.
         * */

        console.info(pedido)

        const pagamento = await this.pagamentoUseCases.buscaUltimaVersao(pedido.getCodigoPedido()!).then()

        pedido.setPagamento(pagamento)

        const pedidoVersao: Pedido = await this.database.adiciona(pedido).then()
        
        return {
            pedido: pedidoVersao,
            pagamento
        }
    }

    async webhook(codigoPedido: string, evento: string): Promise<any> {

        const pedido: Pedido = await this.buscaUltimaVersao(codigoPedido).then()
        console.info(pedido.getStatus())
        if (pedido.getStatus() === StatusPedido.Pagamento && evento === EventosPedido.PAGO ) {
            
            await this.baixarPagamentoPedido(pedido).then()
        }
        
    }

    private async baixarPagamentoPedido(pedido: Pedido): Promise<PedidoVersao> {
        const pagamento: Pagamento = await this.pagamentoUseCases.buscaUltimaVersao(pedido.getCodigoPedido()!).then()

        pedido.setPagamento(pagamento)
        pedido.setStatus(StatusPedido.Preparacao)
        

        await this.database.versiona(pedido).then()

        var pedidoVersao: PedidoVersao = await this.database.adiciona(pedido).then()

        return pedidoVersao
    }
}