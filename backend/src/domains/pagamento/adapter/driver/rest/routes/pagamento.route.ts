import { Router, Request, Response, NextFunction } from 'express'
import { PagamentoController } from "domains/pagamento/adapter/driver/rest/controllers/pagamento.controller"
import { body } from 'express-validator'
import { PagamentoService } from 'domains/pagamento/core/applications/services/pagamento.service';
import { PagamentoDatabase } from 'domains/pagamento/adapter/driven/infra/database/pagamento.database';

const router = Router();

router.post('/',  
  body('codigoPedido').trim().isLength({ min: 1, max: 16 }).notEmpty(),
  body('meio').trim().isLength({ min: 1, max: 6 }).notEmpty(),
  body("nome").notEmpty(),
  body("cpf").notEmpty(),
  body("email").notEmpty(),
  body("valor").notEmpty(),
  body("parcelamento").notEmpty(),
  body("meio").notEmpty(),
  body("data").notEmpty(),
  body("versao").notEmpty(),
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
                'schema': { $ref: '#/definitions/post_pagamentos' }
        }
    */

    const database = new PagamentoDatabase();
    const service = new PagamentoService(database)
    const controller = new PagamentoController(service)

    controller.pagar(request, next).then()
  });


  export default router;