import {
    post_cliente, 
    put_cliente,

} from 'domains/cliente/adapter/driver/rest/swagger/acesso.swagger'

import {
    post_produto, 
    put_produto,

} from 'domains/pedido/adapter/driver/rest/swagger/produto.swagger'

import {
    post_pedido,
    put_pedido,
    post_webhook_pedido

} from 'domains/pedido/adapter/driver/rest/swagger/pedido.swagger'

import {
    post_webhook_mercadopago

} from 'domains/pagamento/adapter/driver/rest/swagger/pagamento.swagger'

export const swagger = {
    swagger: "2.0",
    info: {
        version: '1.0.0',           
        title: 'Tech Challenge Fiap',              
        description: 'Conjuntos dde recursos e operações do Tech Challenge da FIAP'
    },
    host: `localhost:31300`,
    tags: [                   
        {
            name: 'Cliente',             
            description: 'APIs do domínio de Clientes'       
        },  {
            name: 'Pedido',             
            description: 'APIs do domínio de Pedidos'       
        },  {
            name: 'Produto',             
            description: 'APIs para gerenciamento de produtos'       
        }, {
            name: 'Pagamento',             
            description: 'APIs do domínio de Pagamento'       
        }
        
    ],
    definitions: {
        post_cliente,
        put_cliente,
        post_produto,
        put_produto,
        post_pedido,
        post_webhook_pedido,
        put_pedido,
        post_webhook_mercadopago
    }
}