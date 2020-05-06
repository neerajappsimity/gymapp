var jwt = require('jsonwebtoken')
var tokenDecode = require('../logic/token_decode')

const verifyToken = (req, res, next) => {
    try {
        const {token} = req.headers;
        if(tokenDecode(token))
        {
            next();
        }
        else{
            res.json({status:false, msg: 'Invalid Token'})
        }
    } catch (e) {
        console.log(e)
        return res.json({status:false, msg:'Please pass token!'})
    }
}

module.exports = verifyToken