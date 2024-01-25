import { Router, Request, Response, NextFunction } from 'express'
import { PedidoController } from "domains/pedido/adapter/driver/rest/controllers/pedido.controller"
import { body, param } from 'express-validator'
import { PedidoService } from 'domains/pedido/core/applications/services/pedido.service';
import { PedidoDatabase } from 'domains/pedido/adapter/driven/infra/database/pedido.database';

const router = Router();

router.post('/v1',
  body('codigoPedido').trim().isLength({ min: 1, max: 15 }).notEmpty(),
  body('cpf').trim().isLength({ min: 11, max: 11 }).notEmpty(),
  body('data').trim().isLength({ min: 6, max: 10 }).notEmpty(),
  body('horaEntrada').trim().isLength({ min: 1, max: 10 }).notEmpty(),
  body('horaSaida').trim().isLength({ min: 1, max: 10 }).notEmpty(),
  body('valorPedido').trim().notEmpty(),
  body('status').trim().isLength({ min: 5, max: 20 }),
  body('itensPedidos').notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {
  
    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Cria um novo pedido'
        #swagger.description = 'Cria um novo pedido'
        #swagger.operationId = 'postpedido'
        #swagger.deprecated = false
        #swagger.tags = ['Pedido']
        #swagger.parameters['body'] = {
                in: 'body',
                'schema': { $ref: '#/definitions/post_pedido'  }
        }
    */

    const database = new PedidoDatabase();
    const service = new PedidoService(database)
    const controller = new PedidoController(service)

    //const databaseItem = new ItemPedidoDatabase();
    //const serviceItem = new ItemPedidoService(databaseItem)
    //const controllerItem = new ItemPedidoController(serviceItem)

    controller.adiciona(request, next).then()
    //controllerItem.adiciona(request, next).then()
  });

  router.put('/v1/:codigoPedido',
  param('codigoPedido').trim().isLength({ min: 1, max: 15 }).notEmpty(),
  body('cpf').trim().isLength({ min: 11, max: 11 }).notEmpty(),
  body('data').trim().isLength({ min: 6, max: 10 }).notEmpty(),
  body('horaEntrada').trim().isLength({ min: 1, max: 10 }).notEmpty(),
  body('horaSaida').trim().isLength({ min: 1, max: 10 }).notEmpty(),
  body('valorPedido').trim().notEmpty(),
  body('status').trim().isLength({ min: 5, max: 20 }),
  body('itensPedidos').notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {
    
    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Atualiza um pedido'
        #swagger.description = 'Atualiza os dados de um pedido pelo codigo'
        #swagger.operationId = 'putpedido'
        #swagger.deprecated = false
        #swagger.tags = ['Pedido']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/put_pedido' }
        }
    */    

    const database = new PedidoDatabase();
    const service = new PedidoService(database)
    const controller = new PedidoController(service)

    controller.atualiza(request, next).then()
  });

  router.get('/v1',
  body('codigoPedido').trim().isLength({ min: 1, max: 15 }).notEmpty(),
  body('cpf').trim().isLength({ min: 11, max: 11 }).notEmpty(),
  body('data').trim().isLength({ min: 6, max: 10 }).notEmpty(),
  body('horaEntrada').trim().isLength({ min: 1, max: 10 }).notEmpty(),
  body('horaSaida').trim().isLength({ min: 1, max: 10 }).notEmpty(),
  body('valorPedido').trim().notEmpty(),
  body('status').trim().isLength({ min: 5, max: 20 }),
 (request: Request, _response: Response, next: NextFunction) => {

  /**
      @Swagger
      #swagger.auto = true
      #swagger.summary = 'lista todos os pedidos'
      #swagger.description = 'lista todos os pedidos'
      #swagger.operationId = 'getPedido'
      #swagger.deprecated = false
      #swagger.tags = ['Pedido']
      #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/get_pedido' }
      }
  */        

  const database = new PedidoDatabase();
  const service = new PedidoService(database)
  const controller = new PedidoController(service)

  controller.buscaUltimaVersao(request, next).then()
});

export default router;
