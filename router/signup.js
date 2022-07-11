import express from 'express';
import userController from '../controller/userController.js';

export const signupRouter = express.Router();

signupRouter.get('/terms', (req, res) => {
    res.render('terms');
})

signupRouter.get('/phone', (req, res) => {
    res.render('phone');
})

signupRouter.get('/detail', (req, res) => {
    res.render('detail');
})

signupRouter.post('/', userController.signup);