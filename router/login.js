import express from 'express';
import { getAllUsers, registUser, getUserByEmail } from '../dao/userDao.js';

export const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    res.render('login');
})

loginRouter.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = getUserByEmail(email);

    if (user && user.email === email && user.password === password) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.status(204).send();
    }
})