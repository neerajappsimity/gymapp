var jwt = require('jsonwebtoken');
const create_user = require('../../model/user');
const timeStamp = Date.now();
const validator = require('validator');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const config = require('../../config/database');
const path = require('path')
const generateRandomNumber = require('../../logic/random_number')
const sendEmail = require('../../logic/send_emails')
const token_decode = require('../../logic/token_decode')



const register = async(req, res, next) => {
    try{
        const { email, password, phone } = req.body;
        if(!email) return res.json({status:false, msg:'Please provide the email.'})
        if(!validator.isEmail(email)) return res.json({status:false, msg:'Please provide the valid email.'})
        if(!password) return res.json({status:false, msg:'Please provide the password.'})
        if(!phone) return res.json({status:false, msg:'Please provide the phone number.'})
        const fetch_user = await create_user.findOne({email:email})
        if(fetch_user) return res.json({status:false, msg:'email already exist.'})
        const encyPassword = cryptr.encrypt(password);
        const OtprandomeNumber = cryptr.encrypt(generateRandomNumber())
        const add_user = new create_user({
            email: email,
            password: encyPassword,
            phone: phone,
            otpForgetPassword: OtprandomeNumber,
            createdAt: timeStamp,
            updatedAt: timeStamp
        })
        await add_user.save();

        const decyOtp = cryptr.decrypt(OtprandomeNumber);
        sendEmail(decyOtp, email.trim(), true);
        return res.status(200).json({ status: true, msg: `OTP has been sent to ${email.trim()}`, data: add_user })
    }
    catch(e)
    {
        console.log(e);
        return res.status(500).json({status:false, msg:'something went wrong'})
    }
}

const confirmation = async(req, res, next) => {
    try {
        const { email, otp } = req.body
        if(!email) return res.json({status:false, msg:'Please provide email'})
        if(!validator.isEmail(email)) return res.json({status:false, msg:'Please provide a valid email'})
        if(!otp) return res.json({status:false, msg:'Please provide OTP'})
        const encryptotp = cryptr.encrypt(otp)
        const fetch_user = await create_user.findOne({email:email})
        if(!fetch_user) return res.json({status:false,msg:'Email does not match. '})
        if(cryptr.decrypt(fetch_user.otpForgetPassword) !== otp) return res.json({status:false, msg:'Invaild OTP'})
        const token = jwt.sign(fetch_user.toJSON(), config.secretkey)
        fetch_user.otpForgetPassword = null;
        fetch_user.verified = true;
        await fetch_user.save()
        return res.status(200).json({status:true, msg: 'OTP successfully verified.', data: fetch_user, token: token}) 




    } catch (e) {
        console.log(e)
        return res.status(500).json({status:false, msg:'something went wrong'})
    }
}

const login = async(req, res, next) => {
    try {
        const { email, password } = req.body
        if(!email) return res.json({status:false, msg:'Please provid email.'})
        if(!password) return res.json({status:false, msg:'Please provid password.'})
        if(!validator.isEmail(email)) return res.json({status:false, msg:'Please provid a valid email.'})
        const fetch_user = await create_user.findOne({email:email})
        if(!fetch_user) return res.json({status:false, msg:'Email does not match.'})
        if(cryptr.decrypt(fetch_user.password) !== password) return res.json({status:false, msg:'Email and Password does not match.'})
        if(fetch_user.verified === false){
            const randomeNumber = generateRandomNumber();
            sendEmail(randomeNumber, fetch_user.email);
            check_user.otpForgetPassword = cryptr.encrypt(randomeNumber);
            await check_user.save();
            return res.json({ status: false, msg: 'Please confirm your otp.', type: 'confirmation'  });
        }
        const token = jwt.sign(fetch_user.toJSON(), config.secretkey);
        // fetch_user.fcmToken = fcmToken;
        await fetch_user.save();
        return res.status(200).json({ status: true, msg: 'successfully login', data: fetch_user, token: token })
        
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({status:false, msg:'something went wrong'})
    }
}

const profile = async(req, res, next) => {
    try {
        const { token } = req.headers
        const { email, _id } = token_decode(token)
        const fetch_user = await create_user.findOne({ email:email, _id:_id })
        if(!fetch_user) return res.json({status:false, msg:'User not exists!'})
        return res.status(200).json({status: true, msg:'successfully getting.', data:fetch_user});
    } catch (e) {
        console.log(e);
        return res.status(500).json({status:false, msg:'something went wrong'})
    }
}



module.exports = {
    register: register,
    confirmation: confirmation,
    login: login,
    profile: profile
}