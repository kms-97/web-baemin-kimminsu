import service from '../service/userService.js';

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = service.getUserByEmail(email);

    if (user && user.email === email && user.password === password) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.status(204).send();
    }
}

const signup = (req, res) => {
    const user = req.body;

    if (user) {
        service.insertUser(user);
        res.redirect('/login');
    } else {
        console.log('signup error');
    }
}

export default {
    login,
    signup,
}