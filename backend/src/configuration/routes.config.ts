import { Router } from 'express'
import acessoRoutes from '../domains/acesso/adapter/driver/rest/routes/acesso.route'

const routes = Router()

routes.use('/api/acesso', acessoRoutes)

export default routes;
