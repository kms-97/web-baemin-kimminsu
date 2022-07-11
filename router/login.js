import express from 'express';
import userController from '../controller/userController.js';

export const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    res.render('login');
})

loginRouter.post('/', userController.login);