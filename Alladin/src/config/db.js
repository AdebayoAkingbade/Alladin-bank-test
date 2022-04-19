import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'

dotenv.config()

export const connectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log('DB connected')
        })
    } catch (error) {
        console.log(error.message)
    }
}