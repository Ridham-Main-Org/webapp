const sequelize = require('../db');
// const logger = require('../logger');

const { getLogger } = require('../logger');
const logger = getLogger();
    
exports.getHealthz = async (req, res) => {

    if (req.body && (Object.keys(req.body).length || Object.keys(req.query).length)) {
        res.status(400).send();
        logger.error(" Bad request to Healthz api");
    }   
    res.setHeader('Cache-Control', 'no-cache');
    await sequelize.authenticate().then(() => {
        res.status(200).send();
        logger.info(" Health check successful ");
    }).catch(() => {
        res.status(503).send();
    });
    res.status(200).send();
}

