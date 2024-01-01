import { Router } from 'express'
import acessoRoutes from './acesso/routes/acesso.routes'

const routes = Router()

routes.use('/api/acesso', acessoRoutes)

export default routes;
