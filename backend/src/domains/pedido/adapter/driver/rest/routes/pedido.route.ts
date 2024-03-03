import { Router, Request, Response, NextFunction } from 'express'
import { PedidoController } from "domains/pedido/adapter/driver/rest/controllers/pedido.controller"
import { body, param } from 'express-validator'
import { PedidoService } from 'domains/pedido/core/applications/services/pedido.service';
import { PedidoDatabase } from 'domains/pedido/adapter/driven/infra/database/pedido.database';
import { ClienteService } from 'domains/cliente/core/applications/services/cliente.service';
import { ClienteDatabase } from 'domains/cliente/adapter/driven/infra/database/cliente.database';
import { ProdutoDatabase } from 'domains/pedido/adapter/driven/infra/database/produto.database';
import { ProdutoService } from 'domains/pedido/core/applications/services/produto.service';
import { PagamentoService } from 'domains/pagamento/core/applications/services/pagamento.service';
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

    const service = new PedidoService(
      new PedidoDatabase(), 
      new ClienteService(new ClienteDatabase()), 
      new ProdutoService(new ProdutoDatabase()),
      new PagamentoService(
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

    const service = new PedidoService(
      new PedidoDatabase(), 
      new ClienteService(new ClienteDatabase()), 
      new ProdutoService(new ProdutoDatabase()),
      new PagamentoService(
        new PagamentoDatabase(), 
        new PagamentoExternal()
      )
    )
    const controller = new PedidoController(service)        

    controller.webhook(request, next).then()
  });  

router.put('/v1/:codigoPedido',
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

    const service = new PedidoService(
      new PedidoDatabase(), 
      new ClienteService(new ClienteDatabase()), 
      new ProdutoService(new ProdutoDatabase()),
      new PagamentoService(
        new PagamentoDatabase(), 
        new PagamentoExternal()
      )      
    )
    const controller = new PedidoController(service)           

    controller.atualiza(request, next).then()
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

  const service = new PedidoService(
    new PedidoDatabase(), 
    new ClienteService(new ClienteDatabase()), 
    new ProdutoService(new ProdutoDatabase()),
    new PagamentoService(
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

    const service = new PedidoService(
      new PedidoDatabase(), 
      new ClienteService(new ClienteDatabase()), 
      new ProdutoService(new ProdutoDatabase()),
      new PagamentoService(
        new PagamentoDatabase(), 
        new PagamentoExternal()
      )      
    )
    const controller = new PedidoController(service)   

    controller.checkoutPIX(request, next).then()
});


export default router;
