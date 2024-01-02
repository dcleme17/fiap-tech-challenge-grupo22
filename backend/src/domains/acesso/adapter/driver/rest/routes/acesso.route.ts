import { Router, Request, Response, NextFunction } from 'express'
import { ClienteController } from "domains/acesso/adapter/driver/rest/controllers/cliente.controller"
import { body, param } from 'express-validator'
import { ClienteService } from 'domains/acesso/core/applications/services/cliente.service';
import { ClienteDatabase } from 'domains/acesso/adapter/driven/infra/database/cliente.database';

const acessoRoutes = Router();

acessoRoutes.get('/', (_request: Request, response: Response, _next: NextFunction) => {
  return response.json("Clientes OK")
});

acessoRoutes.post('/cliente', 
  body('cpf').trim().isLength({min: 11, max:11}).notEmpty(),
  body('nome').trim().isLength({min: 4, max:60}),
  body('email').trim().isEmail().notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {
    
    const database = new ClienteDatabase();
    const service = new ClienteService(database)
    const controller = new ClienteController(service)

    controller.adiciona(request, next).then()
});

acessoRoutes.put('/cliente/:cpf', 
  param('cpf').trim().isLength({min: 11, max:11}).notEmpty(),
  body('nome').trim().isLength({min: 4, max:60}),
  body('email').trim().isEmail().notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {
    
    const database = new ClienteDatabase();
    const service = new ClienteService(database)
    const controller = new ClienteController(service)

    controller.atualiza(request, next).then()
});

acessoRoutes.get('/cliente/:cpf', 
  param('cpf').trim().isLength({min: 11, max:11}).notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {
    
    const database = new ClienteDatabase();
    const service = new ClienteService(database)
    const controller = new ClienteController(service)

    controller.buscaUltimaVersao(request, next).then()
});

export default acessoRoutes;