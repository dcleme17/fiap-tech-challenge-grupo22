import { Router, Request, Response, NextFunction } from 'express'
import { ProdutoController } from "domains/pedido/adapter/driver/rest/controllers/produto.controller"
import { body, param } from 'express-validator'
import { ProdutoService } from 'domains/pedido/core/applications/services/produto.service';
import { ProdutoDatabase } from 'domains/pedido/adapter/driven/infra/database/produto.database';

const produtoRoutes = Router();

produtoRoutes.get('/', (_request: Request, response: Response, _next: NextFunction) => {
  // #swagger.ignore = true
  return response.json("Lanchonetes OK")
});

produtoRoutes.post('/produto',
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

produtoRoutes.put('/produto/:codigo',
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

produtoRoutes.delete('/produto/:codigo',
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

produtoRoutes.get('/produto/:categoria',
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

export default produtoRoutes;
