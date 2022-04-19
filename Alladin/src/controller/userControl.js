import User from '../model/userSchema.js';
import { loginValidator, signupValidator } from '../validator/userValidate.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const generateToken = (email) => {
    const token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: process.env.DURATION,
    });

    return token;
};

export const signup = async (req, res, next) => {
    try {
        const { error } = signupValidator(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const { name, age, dob, email, password } = req.body
        if (!(name, age, dob, email, password)) {
            return res.status(400).json({ message: 'All fields are required 🚨' })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'kindly login' })
        } else {
            const newUser = await User.create({
                name: req.body.name,
                age: req.body.age,
                dob: new Date(req.body.dob),
                email: req.body.email,
                password: req.body.password
            })
            return res.status(201).json({ status: 'success', data: newUser })
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export const login = async (req, res, next) => {
    try {
        const { error } = loginValidator(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const {email, password} = req.body
        if(!(email || password)){
            return res.status.json({message: 'All fields are required 🚨'})
        }
        const user = await User.findOne({email: req.body.email}).select('+password')
        if(!user){
            return res.status(400).json({ message: 'Login failed'})
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).send({ message: 'Login failed 🚨' });
        }
        const token = generateToken(user.email);
        res.status(201).json({
            status: 'Login successful!',
            user,
            token,
        });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export const deleteUser = async(req, res, next) => {
    try {
          const user = await User.findOneAndDelete(req.params.id)
          if(!user){
              return res.status(400).json({message: 'user does not exist🚨'})
          }else{
              return res.status(200).json({ message: 'User deactivated successfully!☹️ '})
          }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}