import { Router } from 'express'
import acessoRoutes from '../domains/cliente/adapter/driver/rest/routes/cliente.route'
import pedidoRoutes from '../domains/pedido/adapter/driver/rest/routes/pedido.route'
import produtoRoutes from '../domains/pedido/adapter/driver/rest/routes/produto.route'
import pagamentoRoutes from '../domains/pagamento/adapter/driver/rest/routes/pagamento.route'

const routes = Router()

routes.use('/api/clientes', acessoRoutes)
routes.use('/api/pedidos', pedidoRoutes)
routes.use('/api/produtos', produtoRoutes)
routes.use('/api/pagamentos', pagamentoRoutes)

export default routes;
