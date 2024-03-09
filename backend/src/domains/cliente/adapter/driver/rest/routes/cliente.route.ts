import { Router, Request, Response, NextFunction } from 'express'
import { ClienteController } from "domains/cliente/adapter/driver/rest/controllers/cliente.controller"
import { body, param } from 'express-validator'
import { ClienteUseCases } from 'domains/cliente/core/applications/usecases/cliente.usecases';
import { ClienteDatabase } from 'domains/cliente/adapter/driven/infra/database/cliente.database';

const router = Router();

router.post('/v1',
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
        #swagger.tags = ['Cliente']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/post_cliente' }
        }
    */

    const database = new ClienteDatabase();
    const service = new ClienteUseCases(database)
    const controller = new ClienteController(service)

    controller.adiciona(request, next).then()
  });

router.put('/v1/:cpf',
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
        #swagger.tags = ['Cliente']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/put_cliente' }
        }
    */    

    const database = new ClienteDatabase();
    const service = new ClienteUseCases(database)
    const controller = new ClienteController(service)

    controller.atualiza(request, next).then()
  });

router.get('/v1/:cpf',
  param('cpf').trim().isLength({ min: 11, max: 11 }).notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Busca um cliente pelo CPF'
        #swagger.description = 'Busca os dados de clientes pelo CPF'
        #swagger.operationId = 'postcliente'
        #swagger.deprecated = false
        #swagger.tags = ['Cliente']
    */        

    const database = new ClienteDatabase();
    const service = new ClienteUseCases(database)
    const controller = new ClienteController(service)

    controller.buscaUltimaVersao(request, next).then()
  });

export default router;
