import { Router } from 'express'
import acessoRoutes from './domains/acesso/infra/rest/acesso.rest'

const routes = Router()

routes.use('/api/acesso', acessoRoutes)

export default routes;
