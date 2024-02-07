const User = require('./models/User');


  const verifyToken = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || '';
      const base64Credentials = authHeader.split(' ')[1] || '';
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const [enteredUsername, enteredPassword] = credentials.split(':');

      const userData = await User.findOne({ where: { username: enteredUsername } });
      console.log("userdata", userData);
      // console.log("extracted pass", userData.dataValues.password);

      if (userData) {
        const isPasswordCorrect = await userData.validPassword(enteredPassword, userData.dataValues.password);
        if (isPasswordCorrect) {
          req.user = userData;
          next();
        }
      }
      return res.status(401).send();

    } catch (error) {
      console.error('Error verifying credentials:', error);
      res.status(500).send('here it caused Internal Server Error');
    }
};

module.exports = verifyToken;






// // const basicAuth = require('basic-auth');
// const { User } = require('../models');

// const verifyToken = (req, res, next) => {
    
// }

//     // -----------------------------------------------------------------------
//     // authentication middleware

//     // const user = await User.findOne({ where: { username } });
//     // var username;
//     // var pass;
//     // if (user) {
//     //     username = user.username;
//     //     pass = user.password;
//     // } else {

//     // }
  
//     const auth = {login: username, password: pass}
  
//     // parse login and password from headers
//     const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
//     const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  
//     // Verify login and password are set and correct
//     if (login && password && login === auth.login && password === auth.password) {
//       // Access granted...
//       return next()
//     }
  
//     // Access denied...
//     // res.set('WWW-Authenticate', 'Basic realm="401"') // change this
//     res.status(401).send('Authentication required.') // custom message
  
//     // -----------------------------------------------------------------------
  
//   })