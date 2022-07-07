import express from 'express';
import { getAllUsers, registUser } from './dao/userDao.js';

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
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

app.listen(3000);