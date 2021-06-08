 const Token = require('../models/token');

module.exports = async (authHeader) => {
    if (!authHeader) {
        return { error: ' No token provided' }
    }
    const parts = authHeader.split(' ')
    if (!parts.length === 2) {
        return { error: 'Token error' }
    }
    const [scheme, token] = parts
    if (!/^Bearer$/i.test(scheme)) {
        return { error: 'Token malformated' }
    }
    if (await Token.findOne({ token }))
        return { error: 'Token already exists' }
    return token
}