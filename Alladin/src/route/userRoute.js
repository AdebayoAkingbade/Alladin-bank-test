import express from 'express';
import { deleteUser, login, signup } from '../controller/userControl.js';

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.delete('/:id', deleteUser)

export default router