// const logger = require('../logger');
const { getLogger } = require('../logger');
const logger = getLogger();
const User = require('../models/User');

const isUserVerified = async (req, res) => {
    const token = req.query.token;
    if (!token) {
        logger.error("Missing verification token");
        return res.status(400).json({ error: 'Missing verification token' });
    }
    try {
        const userData = await User.findOne({ where: { id: token } });

        if (!userData) {
            logger.error("User not found in isUserVerified");
            return res.status(404).json({ error: 'User not found in isUserVerified' });
        }
        console.log("userData found", userData);
        logger.debug("UserData found in isUserVerified");
        expiry = userData.expiration_time;
        const currTime = Date.now();
        const currTimeStr = currTime.toString(); // Convert timestamp to string

        if (currTimeStr <= expiry) {
            userData.status = 'verified';
        } else {
            userData.status = 'not verified';
        }
        await userData.save();
        logger.debug("Status of verification updated in db");
        return res.json({ 'verification_status': userData.status });

    } catch (error) {
        logger.error("got error in isUserVerified");
        return res.status(500).json({ error: 'here it got Internal server error' });
    }
}

module.exports = { isUserVerified };