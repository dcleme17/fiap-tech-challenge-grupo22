import { Router, Request, Response, NextFunction } from 'express'
import { ClienteAdapter } from "../adapters/cliente.adapter"
import { body } from 'express-validator'

const acessoRoutes = Router();

acessoRoutes.get('/', (request: Request, response: Response, next: NextFunction) => {
  return response.json("Clientes OK")
});

acessoRoutes.post('/cliente', 
  body('cpf').trim().isLength({min: 11, max:11}).notEmpty(),
  body('nome').trim().isLength({min: 4, max:60}),
  body('email').trim().isEmail().notEmpty(),
  (request: Request, response: Response, next: NextFunction) => {
    const adapter = new ClienteAdapter()

    adapter.add(request, response, next).then(resp => {
    return response.json(resp);
  }).catch(err => {
    next(err)
  })
});

export default acessoRoutes;