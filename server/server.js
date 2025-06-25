import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'


//initilize express app

const app= express()

//conneect to database

await connectDB()

//miiddleware
app.use(cors())

//Route
app.get('/', (req, res)=> res.send("Api working"))
app.post('/clerk', express.json(), clerkWebhooks)

//port 
const PORT= process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})