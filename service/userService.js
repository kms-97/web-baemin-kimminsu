import dao from '../dao/userDao.js';

const getAllUsers = () => {
    return dao.getAllUsers();
}

const getUserByEmail = (email) => {
    return dao.getUserByEmail(email);
}

const insertUser = (user) => {
    dao.insertUser(user);
}

export default {
    getAllUsers,
    getUserByEmail,
    insertUser,
}