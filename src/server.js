import express from 'express'
import authRoute from './routes/auth.js'
const PORT = process.env.PORT || 5000
const app = express()

//set arguements to the process

import "./config.js"
import "./validation/validation.js"


app.use( express.json() )
app.use(authRoute)


app.use((error, req, res, next) => {
    if(error.status != 500) {
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            errorName: error.name,
            error: true
        })
    }
}) 

app.listen(PORT, () => console.log("This server is running on http://localhost:" + PORT))
