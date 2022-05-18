import express from 'express'
import authRoute from './routes/auth.js'
const PORT = process.env.PORT || 5000
const app = express()

//set arguements to the process

import "./config.js"
import "./validation/validation.js"


app.use( express.json() )
app.use(authRoute)


app.listen(PORT, () => console.log("This server is running on http://localhost:" + PORT))
