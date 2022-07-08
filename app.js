import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {indexRouter} from './router/index.js'
import {loginRouter} from './router/login.js'
import {signupRouter} from './router/signup.js'

const app = express();
const SECRET = 'randomString';
const PORT = process.env.PORT || 3000;

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

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.listen(PORT);