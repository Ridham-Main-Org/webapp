const logger = require('../logger');
const User = require('../models/User');

const isUserVerified = async (req, res) => {
    const token = req.query.token;
    if (!token) {
        logger.error("Missing verification token");
        return res.status(400).json({ error: 'Missing verification token' });
    }
    try {
        const userData = await User.findOne({ where: { token } });
        console.log("userData found", userData);
        logger.info("UserData found in isUserVerified");
        if (!userData) {
            logger.error("User not found in isUserVerified");
            return res.status(404).json({ error: 'User not found in isUserVerified' });
        }
        expiry = userData.expiration_time;
        const currTime = Date.now();
        const currTimeStr = currTime.toString(); // Convert timestamp to string

        console.log("currTimeStr is", currTimeStr);
        if (currTimeStr < expiry) {
            console.log("here in verified");
            logger.info("here in verified");
            userData.status = 'verified';
        } else {
            userData.status = 'not verified';
        }
        console.log("reached end of verfiy");
        logger.info("reached end of verfiy");
        await userData.save();
        return res.json({ 'verification_status': userData.status });

    } catch (error) {
        console.log("error is", error);
        logger.error("got error in isUserVerified");
        return res.status(500).json({ error: 'here it got Internal server error' });
    }
}

module.exports = { isUserVerified };