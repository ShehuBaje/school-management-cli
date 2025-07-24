const bcrypt = require('bcrypt');
const hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async function(plain, hash) {
    return await bcrypt.compare(plain, hash);
};

module.exports = {hashPassword, comparePassword};