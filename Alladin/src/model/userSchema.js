import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please provide your name'] },
    email: {
        type: String,
        unique: true,
    },
    age: {
        type: Number,
        required: [true, 'Please provide your age']
    },
    dob: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema
    .pre('save', async function (next) {
        const user = this;
        if (!user.isModified('password')) return next();
        user.password = await bcrypt.hash(user.password, 10)
    })

// UserSchema
//     .pre('save', function (next) {
//         this.birthmonth = this.dob.getMonth() + 1;
//         this.birthday = this.dob.getDate()
//         next();
//     });

UserSchema.methods.comparePassword = async function (userPassword, cb) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
};
const User = mongoose.model('User', UserSchema)
export default User