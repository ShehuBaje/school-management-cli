const {readData, writeData} = require('../utils/file');
const {hashPassword, comparePassword} = require('../utils/hash');
const USERS_FILE = 'users.json';

class UserManager{
    static async register(role, email, name, password) {
        const users = await readData(USERS_FILE);
        const exists = users.find(user => user.email === email);
        if (exists) throw new Error ('User already exists.');

        const hashed = await hashPassword(password);
        const newUser = {
            id: Date.now(), name, role, email, password: hashed, createdAt: new Date().toISOString()
        };
        users.push(newUser);
        await writeData(USERS_FILE, users);
        return newUser;
    }

    static async login(email, password) {
        const users = await readData(USERS_FILE);
        const user = users.find(user => user.email === email);
        if(!user || !(await comparePassword(password, user.password))) {
            throw new Error('Invalid credentials.');
        }
        return user;
    }

    static async getUserByRole(role) {
        const users = await readData(USERS_FILE);
        return users.filter(user => user.role === role);
    }

    static async deleteUserById(id) {
        let users = await readData(USERS_FILE);
        users = users.filter(user => user.id !== id);
        await writeData(USERS_FILE, users);
        return true;
    }
}

module.exports = UserManager