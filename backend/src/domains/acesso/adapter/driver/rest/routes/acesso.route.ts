import { Router, Request, Response, NextFunction } from 'express'
import { ClienteController } from "domains/acesso/adapter/driver/rest/controllers/cliente.controller"
import { body, param } from 'express-validator'
import { ClienteService } from 'domains/acesso/core/applications/services/cliente.service';
import { ClienteDatabase } from 'domains/acesso/adapter/driven/infra/database/cliente.database';

const acessoRoutes = Router();

acessoRoutes.get('/', (_request: Request, response: Response, _next: NextFunction) => {
  // #swagger.ignore = true
  return response.json("Clientes OK")
});

acessoRoutes.post('/cliente',
  body('cpf').trim().isLength({ min: 11, max: 11 }).notEmpty(),
  body('nome').trim().isLength({ min: 4, max: 60 }),
  body('email').trim().isEmail().notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Cria um novo cliente'
        #swagger.description = 'Cria um novo cliente a partir das informações básicas'
        #swagger.operationId = 'postcliente'
        #swagger.deprecated = false
        #swagger.tags = ['Acesso']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/post_cliente' }
        }
    */

    const database = new ClienteDatabase();
    const service = new ClienteService(database)
    const controller = new ClienteController(service)

    controller.adiciona(request, next).then()
  });

acessoRoutes.put('/cliente/:cpf',
  param('cpf').trim().isLength({ min: 11, max: 11 }).notEmpty(),
  body('nome').trim().isLength({ min: 4, max: 60 }),
  body('email').trim().isEmail().notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Atualiza um novo cliente'
        #swagger.description = 'Atualiza os dados de um cliente pelo CPF'
        #swagger.operationId = 'postcliente'
        #swagger.deprecated = false
        #swagger.tags = ['Acesso']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/put_cliente' }
        }
    */    

    const database = new ClienteDatabase();
    const service = new ClienteService(database)
    const controller = new ClienteController(service)

    controller.atualiza(request, next).then()
  });

acessoRoutes.get('/cliente/:cpf',
  param('cpf').trim().isLength({ min: 11, max: 11 }).notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Busca um cliente pelo CPF'
        #swagger.description = 'Busca os dados de clientes pelo CPF'
        #swagger.operationId = 'postcliente'
        #swagger.deprecated = false
        #swagger.tags = ['Acesso']
    */        

    const database = new ClienteDatabase();
    const service = new ClienteService(database)
    const controller = new ClienteController(service)

    controller.buscaUltimaVersao(request, next).then()
  });
acessoRoutes.patch('/cliente/:cpf/nome',
  param('cpf').trim().isLength({ min: 11, max: 11 }).notEmpty(),
  body('nome').trim().isLength({ min: 4, max: 60 }),
  (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Busca um cliente pelo CPF'
        #swagger.description = 'Busca os dados de clientes pelo CPF'
        #swagger.operationId = 'postcliente'
        #swagger.deprecated = false
        #swagger.tags = ['Acesso']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/patch_cliente_nome' }
        }        
    */        

    const database = new ClienteDatabase();
    const service = new ClienteService(database)
    const controller = new ClienteController(service)

    controller.buscaUltimaVersao(request, next).then()
  });

export default acessoRoutes;