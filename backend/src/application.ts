import swaggerAutogen from 'swagger-autogen'
import { swagger } from 'swagger/swagger.js'

const outputFile = './swagger/swagger.json'
const routes = ['./configuration/routes.config.ts']

swaggerAutogen({
  language: 'pt-BR'
})(outputFile, routes, swagger).then(async () => {
  await import('./configuration/server.config.js')
})
