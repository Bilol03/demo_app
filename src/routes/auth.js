import controller from "../controller/auth.controller.js"
import validator from "../middlewares/validation.js"
import express from "express"
const route = express.Router()

route.post("/register", validator, controller.REGISTER)
route.post("/login", controller.LOGIN)

export default route