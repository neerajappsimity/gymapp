var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var emailDetails = require('../config/mail');

const { email, password } = emailDetails;

var mailAccountUser = email;
var mailAccountPassword = password;

var fromEmailAddress = email;
var toEmailAddress = 'neeraj.kumar@appsimity.com';

var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    }
}))

sendEmail =(code, emailAddress, checkotp) => {

    let displayMessageHTML;

    if(checkotp === true)
    {
        displayMessageHTML = `<p>Your OTP is ${code} </p>`;
    }
    else{
        displayMessageHTML = `<p> Your verification  code for GYM Fitness registration is ${code} </p>`;
    }

    let email = {
        from: fromEmailAddress,
        to: emailAddress,
        subject: 'GYM Fitness',
        html: displayMessageHTML
    }

    try
    {
        transport.sendMail(email, function(error, response){
            if(error)
            {
                console.log(error)
                return false;
            }
            else
            {
                console.log(response)
                return true;
            }
        });
    }
    catch(error)
    {
        return false;
    }
}

module.exports = sendEmail