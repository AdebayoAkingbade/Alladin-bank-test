import express from 'express';
import mongoose from 'mongoose';
import Joi from 'joi';

export const signupValidator = (user)=>{
    const schema = Joi.object({
        name: Joi.string().max(30),
        age: Joi.number().required(),
        dob: Joi.date().max('1-1-2005').iso().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(7).required()
    })
    return schema.validate(user)
}

export const loginValidator = (user)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}