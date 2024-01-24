import {
    post_cliente, 
    put_cliente,

} from 'domains/acesso/adapter/driver/rest/swagger/acesso.swagger'

import {
    post_produto, 
    put_produto,
    get_pedido,
    post_pedido,
    put_pedido

} from 'domains/acesso/adapter/driver/rest/swagger/lanchonete.swagger'

export const swagger = {
    info: {
        version: '1.0.0',           
        title: 'Tech Challenge Fiap',              
        description: 'Conjuntos dde recursos e operações do Tech Challenge da FIAP'
    },
    host: 'localhost:3000',
    tags: [                   
        {
            name: 'Acesso',             
            description: 'APIs do domínio de Acesso'       
        },
    ],
    definitions: {
        post_cliente,
        put_cliente
    }
}