import { Router } from 'express'
import acessoRoutes from '../domains/acesso/adapter/driver/rest/routes/acesso.route'
import pedidoRoutes from '../domains/pedido/adapter/driver/rest/routes/pedido.route'
import produtoRoutes from '../domains/pedido/adapter/driver/rest/routes/produto.route'
import pagamentoRoutes from '../domains/pagamento/adapter/driver/rest/routes/pagamento.route'

const routes = Router()

routes.use('/api/acesso', acessoRoutes)
routes.use('/api/pedido', pedidoRoutes)
routes.use('/api/produto', produtoRoutes)
routes.use('/api/pagamento', pagamentoRoutes)

export default routes;
