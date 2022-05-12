import controller from "../controller/auth.controller.js"
import express from "express"
const route = express.Router()

route.get("/", controller.GET)

export default route