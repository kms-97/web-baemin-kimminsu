import express from 'express';

export const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    const user = req.session.user;
    res.render('index', { nickname: user ? user.nickname : '' });
})