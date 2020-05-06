const passwordSecure = (value) => {

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if(value.length < 8){
        const json = `{ "status" : false, "msg" : "password must consist more than 8 character."}`
        return  JSON.parse(json);
    }

    if(value.includes('password')){ 
        const json = `{ "status" : false, "msg" : "can not consist word password in it."}`
        return  JSON.parse(json);
    }
    if(!strongRegex.test(value)) {
        const json = `{ "status" : false, "msg" : "Password must be including 1 upper case, special character and alphanumeric."}`
        return  JSON.parse(json);
    }

    const json = `{ "status" : true, "msg" : "Password is secured"}`
    return  JSON.parse(json);
}

module.exports =  passwordSecure