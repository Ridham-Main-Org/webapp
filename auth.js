const User = require('./models/User');
const logger = require('./logger');

  const verifyToken = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || '';
      const base64Credentials = authHeader.split(' ')[1] || '';
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const [enteredUsername, enteredPassword] = credentials.split(':');

      const userData = await User.findOne({ where: { username: enteredUsername } });
      // console.log("extracted pass", userData.dataValues.password);

      if (userData) {
        const isPasswordCorrect = await userData.validPassword(enteredPassword, userData.dataValues.password);
        if (isPasswordCorrect) {
          req.user = userData;
          return next();
        }
      }
      // logger.error("User unauthorized!");
      return res.status(401).send();

    } catch (error) {
      console.error('Error verifying credentials:', error);

      res.status(500).send('here it caused Internal Server Error');
    }
};

module.exports = verifyToken;