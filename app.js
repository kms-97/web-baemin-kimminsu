import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { getAllUsers, registUser, getUserByEmail } from './dao/userDao.js';

const app = express();
const SECRET = 'randomString';

app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}))

app.get('/', (req, res) => {
    const user = req.session.user;
    res.render('index', { nickname: user ? user.nickname : '' });
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/terms', (req, res) => {
    res.render('terms');
})

app.get('/phone', (req, res) => {
    res.render('phone');
})

app.get('/detail', (req, res) => {
    res.render('detail');
})

app.post('/signup', (req, res) => {
    const user = req.body;
    registUser(user);
    res.redirect('/login');
})

app.post('/login', (req, res) => {
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

app.listen(3000);