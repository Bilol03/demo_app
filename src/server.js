import express from 'express'
import "./config.js"
import authRoute from './routes/auth.js'
const PORT = process.env.PORT || 5000
const app = express()

app.use(authRoute)


app.listen(PORT, () => console.log("This server is running on http://localhost:" + PORT))
