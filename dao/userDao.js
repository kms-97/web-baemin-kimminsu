import db from '../db.js';

const insertUser = (newUser) => {
    db.data.users.push(newUser);
    db.write();
}

const getAllUsers = () => {
    return db.data.users;
}

const getUserByEmail = (email) => {
    const users = getAllUsers();
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.email === email) return user;
    }

    return null;
}

export default {
    getAllUsers,
    insertUser,
    getUserByEmail,
};