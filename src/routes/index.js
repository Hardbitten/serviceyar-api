import {Router} from "express"

const routes = Router()

routes.use("/users" ,require("./users"))
routes.use("/drivers" ,require("./driver"))

module.exports =  routes