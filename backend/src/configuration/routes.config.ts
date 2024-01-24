import { Router } from 'express'
import acessoRoutes from '../domains/acesso/adapter/driver/rest/routes/acesso.route'
import lanchoneteRoutes from '../domains/acesso/adapter/driver/rest/routes/lanchonete.route'

const routes = Router()

routes.use('/api/acesso', acessoRoutes)
routes.use('/api/lanchonete', lanchoneteRoutes)

export default routes;
