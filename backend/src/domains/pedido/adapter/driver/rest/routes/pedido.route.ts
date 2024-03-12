import { Router, Request, Response, NextFunction } from 'express'
import { PedidoController } from "domains/pedido/adapter/driver/rest/controllers/pedido.controller"
import { body, param } from 'express-validator'
import { PedidoUseCases } from 'domains/pedido/core/applications/usecases/pedido.usecases';
import { PedidoDatabase } from 'domains/pedido/adapter/driven/infra/database/pedido.database';
import { ClienteUseCases } from 'domains/cliente/core/applications/usecases/cliente.usecases';
import { ClienteDatabase } from 'domains/cliente/adapter/driven/infra/database/cliente.database';
import { ProdutoDatabase } from 'domains/pedido/adapter/driven/infra/database/produto.database';
import { ProdutoUseCases } from 'domains/pedido/core/applications/usecases/produto.usecases';
import { PagamentoUseCases } from 'domains/pagamento/core/applications/usecases/pagamento.usecases';
import { PagamentoDatabase } from 'domains/pagamento/adapter/driven/infra/database/pagamento.database';
import { PagamentoExternal } from 'domains/pagamento/adapter/driven/infra/external/pagamento.external';

const router = Router();

router.post('/v1',
  body('cpf').trim().isLength({ min: 11, max: 11 }).notEmpty().optional(),
  body('itens').notEmpty().isArray(),
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

    const service = new PedidoUseCases(
      new PedidoDatabase(), 
      new ClienteUseCases(new ClienteDatabase()), 
      new ProdutoUseCases(new ProdutoDatabase()),
      new PagamentoUseCases(
        new PagamentoDatabase(), 
        new PagamentoExternal()
      )
    )
    const controller = new PedidoController(service)        

    controller.adiciona(request, next).then()
  });

  router.post('/v1/webhook',
  body('codigoPedido').trim().isLength({ min: 1, max: 20 }),
  body('evento').trim().isLength({ min: 1, max: 20 }),
  (request: Request, _response: Response, next: NextFunction) => {
  
    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Informa uma evento para o pedido'
        #swagger.description = 'Informa um evento para o pedido'
        #swagger.operationId = 'postwebhookpedido'
        #swagger.deprecated = false
        #swagger.tags = ['Pedido']
        #swagger.parameters['body'] = {
                in: 'body',
                'schema': { $ref: '#/definitions/post_webhook_pedido'  }
        }
    */

    const service = new PedidoUseCases(
      new PedidoDatabase(), 
      new ClienteUseCases(new ClienteDatabase()), 
      new ProdutoUseCases(new ProdutoDatabase()),
      new PagamentoUseCases(
        new PagamentoDatabase(), 
        new PagamentoExternal()
      )
    )
    const controller = new PedidoController(service)        

    controller.webhook(request, next).then()
  });  

router.put('/v1/:codigoPedido',
param('codigoPedido').trim().isLength({ min: 1, max: 15 }).notEmpty(),
body('cpf').trim().isLength({ min: 11, max: 11 }).notEmpty().optional(),
body('itens').notEmpty().isArray(),
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

    const service = new PedidoUseCases(
      new PedidoDatabase(), 
      new ClienteUseCases(new ClienteDatabase()), 
      new ProdutoUseCases(new ProdutoDatabase()),
      new PagamentoUseCases(
        new PagamentoDatabase(), 
        new PagamentoExternal()
      )      
    )
    const controller = new PedidoController(service)           

    controller.atualiza(request, next).then()
  });

  router.get('/v1/:codigoPedido/status',
  param('codigoPedido').trim().isLength({ min: 1, max: 15 }).notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {
    
    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'consulta status do pedido'
        #swagger.description = 'Consulta o status do pedido'
        #swagger.operationId = 'putpedido'
        #swagger.deprecated = false
        #swagger.tags = ['Pedido']
    */   

    const service = new PedidoUseCases(
      new PedidoDatabase(), 
      new ClienteUseCases(new ClienteDatabase()), 
      new ProdutoUseCases(new ProdutoDatabase()),
      new PagamentoUseCases(
        new PagamentoDatabase(), 
        new PagamentoExternal()
      )      
    )
    const controller = new PedidoController(service)           

    controller.buscaStatus(request, next).then()
  });


  router.put('/v1/:codigoPedido/status',
  param('codigoPedido').trim().isLength({ min: 1, max: 15 }).notEmpty(),
  body('statusPedido').trim().isLength({ min: 1, max: 30 }).notEmpty().optional(),
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
                  'schema': { $ref: '#/definitions/put_pedido_status' }
          }
      */   
  
      const service = new PedidoUseCases(
        new PedidoDatabase(), 
        new ClienteUseCases(new ClienteDatabase()), 
        new ProdutoUseCases(new ProdutoDatabase()),
        new PagamentoUseCases(
          new PagamentoDatabase(), 
          new PagamentoExternal()
        )      
      )
      const controller = new PedidoController(service)           
  
      controller.atualizaStatus(request, next).then()
    });

router.get('/v1',
 (request: Request, _response: Response, next: NextFunction) => {

  /**
      @Swagger
      #swagger.auto = true
      #swagger.summary = 'lista todos os pedidos'
      #swagger.description = 'lista todos os pedidos'
      #swagger.operationId = 'getPedido'
      #swagger.deprecated = false
      #swagger.tags = ['Pedido']
  */        

  const service = new PedidoUseCases(
    new PedidoDatabase(), 
    new ClienteUseCases(new ClienteDatabase()), 
    new ProdutoUseCases(new ProdutoDatabase()),
    new PagamentoUseCases(
      new PagamentoDatabase(), 
      new PagamentoExternal()
    )      
  )
  const controller = new PedidoController(service)   

  controller.listaPedidos(request, next).then()
});  

router.put('/v1/:codigoPedido/checkout/pix',
  param('codigoPedido').trim().isLength({ min: 1, max: 15 }).notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {
    
    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Faz o checkout de um pedido'
        #swagger.description = 'Faz o checkout de um pedido com a forma de pagamento PIX'
        #swagger.operationId = 'putpedido'
        #swagger.deprecated = false
        #swagger.tags = ['Pedido']
    */ 

    const service = new PedidoUseCases(
      new PedidoDatabase(), 
      new ClienteUseCases(new ClienteDatabase()), 
      new ProdutoUseCases(new ProdutoDatabase()),
      new PagamentoUseCases(
        new PagamentoDatabase(), 
        new PagamentoExternal()
      )      
    )
    const controller = new PedidoController(service)   

    controller.checkoutPIX(request, next).then()
});


export default router;
