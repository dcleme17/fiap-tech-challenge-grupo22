import { Environment } from "./environment"
import ExpressConfig from "./express.config"

new Environment().config()

const app = ExpressConfig()

console.info(process.env.PORT)

app.listen(process.env.PORT , () => {
    console.log("Server Running on Port " + process.env.PORT)
})