import express from 'express';
import * as dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import userRouter from './src/route/userRoute.js'


dotenv.config();
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', userRouter)


const port = process.env.PORT || 7979
app.listen(port, ()=>{
    console.log(`app is listening on ${port}`)
})