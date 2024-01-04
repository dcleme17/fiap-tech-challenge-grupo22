import { Environment } from "./environment.config"
import ExpressConfig from "configuration/express.config"

Environment()

const app = ExpressConfig()

console.info(process.env.PORT)

app.listen(process.env.PORT , () => {
    console.log("Server Running on Port " + process.env.PORT)
})