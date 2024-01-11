import { Router, Request, Response, NextFunction } from 'express'
import { ClienteController } from "domains/acesso/adapter/driver/rest/controllers/cliente.controller"
import { ProdutoController } from "domains/acesso/adapter/driver/rest/controllers/produto.controller"
import { body, param } from 'express-validator'
import { ClienteService } from 'domains/acesso/core/applications/services/cliente.service';
import { ClienteDatabase } from 'domains/acesso/adapter/driven/infra/database/cliente.database';
import { ProdutoService } from 'domains/acesso/core/applications/services/produto.service';
import { ProdutoDatabase } from 'domains/acesso/adapter/driven/infra/database/produto.database';

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

  acessoRoutes.post('/produto',
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

  acessoRoutes.put('/produto/:codigo',
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

  
acessoRoutes.get('/produto',
(request: Request, _response: Response, next: NextFunction) => {

  /**
      @Swagger
      #swagger.auto = true
      #swagger.summary = 'lista todos os produtos'
      #swagger.description = 'lista todos os produtos'
      #swagger.operationId = 'getProduto'
      #swagger.deprecated = false
      #swagger.tags = ['Acesso']
  */        

  const database = new ProdutoDatabase();
  const service = new ProdutoService(database)
  const controller = new ProdutoController(service)

  controller.buscaUltimaVersao(request, next).then()
});


acessoRoutes.get('/produto/:categoria',
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

  controller.buscaUltimaVersao(request, next).then()
});


export default acessoRoutes;
