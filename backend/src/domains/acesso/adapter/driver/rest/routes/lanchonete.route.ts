import { Router, Request, Response, NextFunction } from 'express'
import { ProdutoController } from "domains/acesso/adapter/driver/rest/controllers/produto.controller"
import { PedidoController } from "domains/acesso/adapter/driver/rest/controllers/pedido.controller"
import { body, param } from 'express-validator'
import { ProdutoService } from 'domains/acesso/core/applications/services/produto.service';
import { ProdutoDatabase } from 'domains/acesso/adapter/driven/infra/database/produto.database';
import { PedidoService } from 'domains/acesso/core/applications/services/pedido.service';
import { PedidoDatabase } from 'domains/acesso/adapter/driven/infra/database/pedido.database';

const lanchoneteRoutes = Router();

lanchoneteRoutes.get('/', (_request: Request, response: Response, _next: NextFunction) => {
  // #swagger.ignore = true
  return response.json("Lanchonetes OK")
});

lanchoneteRoutes.post('/produto',
  body('codigo').trim().isLength({ min: 1, max: 6 }).notEmpty(),
  body('produto').trim().isLength({ min: 4, max: 60 }).notEmpty(),
  body('categoria').trim().isLength({ min: 4, max: 60 }).notEmpty(),
  body('preco').trim().notEmpty(),
  body('descricao').trim().isLength({ min: 4, max: 80 }),
  (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Cria um novo produto'
        #swagger.description = 'Cria um novo produto a partir das informações básicas'
        #swagger.operationId = 'postproduto'
        #swagger.deprecated = false
        #swagger.tags = ['Acesso']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/post_produto' }
        }
    */

    const database = new ProdutoDatabase();
    const service = new ProdutoService(database)
    const controller = new ProdutoController(service)

    controller.adiciona(request, next).then()
  });

lanchoneteRoutes.put('/produto/:codigo',
  param('codigo').trim().isLength({ min: 1, max: 6 }).notEmpty(),
  body('produto').trim().isLength({ min: 4, max: 60 }).notEmpty(),
  body('categoria').trim().isLength({ min: 4, max: 60 }).notEmpty(),
  body('preco').trim().notEmpty(),
  body('descricao').trim().isLength({ min: 4, max: 80 }),
  (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Atualiza um novo produto'
        #swagger.description = 'Atualiza os dados de um produto pelo codigo'
        #swagger.operationId = 'postproduto'
        #swagger.deprecated = false
        #swagger.tags = ['Acesso']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/put_produto' }
        }
    */    

    const database = new ProdutoDatabase();
    const service = new ProdutoService(database)
    const controller = new ProdutoController(service)

    controller.atualiza(request, next).then()
  });

lanchoneteRoutes.delete('/produto/:codigo',
  param('codigo').trim().isLength({ min: 1, max: 6 }).notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {

    /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Deleta um produto'
        #swagger.description = 'Deleta os dados de um produto pelo codigo'
        #swagger.operationId = 'deleteproduto'
        #swagger.deprecated = false
        #swagger.tags = ['Acesso']
    */    

    const database = new ProdutoDatabase();
    const service = new ProdutoService(database)
    const controller = new ProdutoController(service)
    console.log("ACESSOROUTE -> PRODUTO DELETE")
    controller.remove(request, next).then()
  });

lanchoneteRoutes.get('/produto/:categoria',
  param('categoria').trim().isLength({ min: 4, max: 60 }).notEmpty(),
(request: Request, _response: Response, next: NextFunction) => {

  /**
      @Swagger
      #swagger.auto = true
      #swagger.summary = 'busca produtos por categoria'
      #swagger.description = 'busca produtos por categoria'
      #swagger.operationId = 'getProduto'
      #swagger.deprecated = false
      #swagger.tags = ['Acesso']
  */        

  const database = new ProdutoDatabase();
  const service = new ProdutoService(database)
  const controller = new ProdutoController(service)

  controller.buscaProduto(request, next).then()
});

lanchoneteRoutes.post('/pedido',
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
        #swagger.tags = ['Acesso']
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

lanchoneteRoutes.put('/pedido/:codigoPedido',
  param('codigoPedido').trim().isLength({ min: 1, max: 15 }).notEmpty(),
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
        #swagger.summary = 'Atualiza um pedido'
        #swagger.description = 'Atualiza os dados de um pedido pelo codigo'
        #swagger.operationId = 'putpedido'
        #swagger.deprecated = false
        #swagger.tags = ['Acesso']
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

lanchoneteRoutes.get('/pedido',
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
      #swagger.tags = ['Acesso']
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

export default lanchoneteRoutes;
