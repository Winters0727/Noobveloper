const bcrypt = require('bcryptjs');

const hashPassword = function(password) {
    return bcrypt.hashSync(password, 10)
}

const comparePassword = function(password, hashedpassword) {
    return bcrypt.compareSync(password, hashedpassword)
}

const checkEmail = function(email) {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email)
}

const generateRandomString = function(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    const charactersLength = characters.length;
    for (let counter=0; counter < length; counter++) {
        result += characters[Math.floor(Math.random()*charactersLength)]
    }
    return result
}

module.exports = { hashPassword, comparePassword, checkEmail, generateRandomString }