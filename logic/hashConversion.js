let bcrypt = require('bcryptjs');

const hashPassword = async (hashItem) => {
    // const password = user.password
    const hashIt = hashItem;
    const saltRounds = 10;
  
    // const hashedPassword = await new Promise((resolve, reject) => {
     return await new Promise((resolve, reject) => {

      bcrypt.hash(hashIt, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    // return hashedPassword
  }

   module.exports = hashPassword;



  // Way to use the obove the defined function

//first one

//   hashPassword('1234').then( ( result) => {
//       console.log(result);
//   }).catch( (e) => {
//       console.log(`Error Occured bro!! ${e}`);
//   })

// second one

// const testcase = async () => {
//     const gg = await hashPassword('12345');
//     console.log(`hashed stuff12 - ${gg}`);
// }

// testcase();
