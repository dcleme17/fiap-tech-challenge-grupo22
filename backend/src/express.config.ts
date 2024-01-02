import express, { Application } from "express"
import compression from "compression"
import cookieParser from "cookie-parser"
import helmet from "helmet"

import routes from "./routes.config";
import {errorHandler } from "./domains/suporte/infra/error.handler"


const ExpressConfig = (): Application => {
  const app = express()
  app.use(compression())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(helmet())
  app.use(cookieParser())

  app.use(routes)

  app.use(errorHandler);
  
  return app
}
export default ExpressConfig