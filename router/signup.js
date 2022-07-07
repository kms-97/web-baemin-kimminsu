import express from 'express';
import { getAllUsers, registUser, getUserByEmail } from '../dao/userDao.js';

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

signupRouter.post('/', (req, res) => {
    const user = req.body;
    registUser(user);
    res.redirect('/login');
})