import path from 'path'
import { Low, JSONFile } from 'lowdb'

const __dirname = path.resolve();

// Use JSON file for storage
const file = path.join(__dirname, '/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// init
await db.read()
db.data = db.data || { users: [] } // Node < v15.x
await db.write()

const registUser = (newUser) => {
    db.data.users.push(newUser);
    db.write();
}

const getAllUsers = () => {
    return db.data.users;
}

const getUserByEmail = (email) => {
    db.data.users.forEach((user) => {
        if (user.email === email) return user;
    })

    return null;
}

export {
    getAllUsers,
    registUser,
    getUserById,
};