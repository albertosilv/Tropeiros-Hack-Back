const jwt = require('jsonwebtoken')
const authentication = require('./authentication')

module.exports = async (req, res, next) => {
    const token = await authentication(req.headers.authorization);
    if(typeof token == 'object'){
        return res.status(401).json(token)
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ Error: 'Token invalid' })
        }
        req.userId = decoded.id
        return next()
    })
}
