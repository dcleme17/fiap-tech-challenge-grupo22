import swaggerAutogen from 'swagger-autogen'
import { swagger } from 'swagger/swagger'

const outputFile = './swagger/swagger.json'
const routes = ['./configuration/routes.config.ts']

swaggerAutogen()(outputFile, routes, swagger);