import path from "path"
import fs from "fs"
import jwt from "../utils/jwt.js"
const LOGIN = (req, res) => {

} 

const REGISTER = (req, res) => {
    try{
        let users = fs.readFileSync(path.join(process.cwd(), "src", "database", "user.json"), "UTF-8")
        users = users ? JSON.parse(users) : []
        const { username, password, birthDate } = req.body
        const newUser  = {
            userId : users.length ? users.at(-1).userId + 1 : 1, 
            username,
            password,
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

    }
} 

export default {
    LOGIN,
    REGISTER,

}