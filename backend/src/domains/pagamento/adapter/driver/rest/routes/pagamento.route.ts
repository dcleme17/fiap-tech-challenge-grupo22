import { Router, Request, Response, NextFunction } from 'express'
import { PagamentoController } from "domains/pagamento/adapter/driver/rest/controllers/pagamento.controller"
import { body, param } from 'express-validator'
import { PagamentoService } from 'domains/pagamento/core/applications/services/pagamento.service';
import { PagamentoDatabase } from 'domains/pagamento/adapter/driven/infra/database/pagamento.database';

const router = Router();

router.get('/', (_request: Request, response: Response, _next: NextFunction) => {
  // #swagger.ignore = true
  return response.json("Pagamentos OK")
});

router.post('/',
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
        #swagger.tags = ['Pagamento']
        #swagger.parameters['body'] = { 
                in: 'body', 
                'schema': { $ref: '#/definitions/post_produto' }
        }
    */

    const database = new PagamentoDatabase();
    const service = new PagamentoService(database)
    const controller = new PagamentoController(service)

    controller.adiciona(request, next).then()
  });

  export default router;