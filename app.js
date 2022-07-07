import express from 'express';

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

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

app.listen(3000);