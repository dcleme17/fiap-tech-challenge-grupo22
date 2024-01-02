import { Router, Request, Response, NextFunction } from 'express'
import { ClienteAdapter } from "../../controllers/adapters/cliente.adapter"
import { body, param } from 'express-validator'

const acessoRoutes = Router();

acessoRoutes.get('/', (_request: Request, response: Response, next: NextFunction) => {
  return response.json("Clientes OK")
});

acessoRoutes.post('/cliente', 
  body('cpf').trim().isLength({min: 11, max:11}).notEmpty(),
  body('nome').trim().isLength({min: 4, max:60}),
  body('email').trim().isEmail().notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {
    
    const adapter = new ClienteAdapter()

    adapter.add(request).then(resp => {
    
    return next(resp);
    
  }).catch(err => {
    next(err)
  })
});

acessoRoutes.get('/cliente/:cpf', 
  param('cpf').trim().isLength({min: 11, max:11}).notEmpty(),
  (request: Request, _response: Response, next: NextFunction) => {
    
    const adapter = new ClienteAdapter()

    adapter.buscaUltimaVersao(request).then(resp => {
    
    return next(resp);
    
  }).catch(err => {
    next(err)
  })
});

export default acessoRoutes;