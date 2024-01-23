import {
    post_cliente, 
    put_cliente,
    patch_cliente_nome
} from 'domains/acesso/adapter/driver/rest/swagger/acesso.swagger'

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
        put_cliente,
        patch_cliente_nome
    }
}