import path from "path"
import fs from "fs"
import jwt from "../utils/jwt.js"
import md5 from 'md5'
import { AuthorizationError, InternalServerError } from "../utils/error.js"

const REGISTER = (req, res, next) => {
    try{
        let users = fs.readFileSync(path.join(process.cwd(), "src", "database", "user.json"), "UTF-8")
        users = users ? JSON.parse(users) : []
        const { username, password, birthDate } = req.body
        
        let user = users.find(user => user.username == username)
        
        if(user) {
            return next(new AuthorizationError(400, "User is already exists"))
        }
        
        const newUser  = {
            userId : users.length ? users.at(-1).userId + 1 : 1, 
            username,
            password: md5(password),
            birthDate
        }
        users.push(newUser)
        
        fs.writeFileSync(path.join(process.cwd(), "src", "database", "user.json"), JSON.stringify(users, null, 4))
        res.status(200).json({
            status: 200,
            message: "User successfully registered",
            token: jwt.sign(newUser.userId),
            data: newUser
        })
        
    } catch(error) {
        return next(new InternalServerError(500, error.message))
    }
} 

const LOGIN = (req, res) => {
    try{
        let users = fs.readFileSync(path.join(process.cwd(), "src", "database", "user.json"), "UTF-8")
        users = users ? JSON.parse(users) : []
        const { username, password } = req.body

        let user = users.find(user => user.username == username && user.password == md5(password))
        if(!user) {
            return next(new AuthorizationError(401, "The user wasn't found"))
        }
        res.status(200).json({
            status: 200,
            message: "User successfully logged in",
            token: jwt.sign(user.userId),
            data: user
        })

    } catch(error) {
        return next(new InternalServerError(500, error.message))
    }
} 


export default {
    LOGIN,
    REGISTER,
    
}
