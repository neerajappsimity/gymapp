const jwt = require('jsonwebtoken')
const config = require('../config/database')

token_decode = (token)=> {
    try{
        const decode = jwt.verify(token, config.secretkey)
        if(decode)
        {
            return decode
        }
        return false
    }
    catch(e){
        console.log(e)
    }
}

module.exports = token_decode