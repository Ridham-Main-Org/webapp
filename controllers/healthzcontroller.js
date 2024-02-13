const sequelize = require('../db');

exports.getHealthz = async (req, res) => {

    if (req.body && (Object.keys(req.body).length || Object.keys(req.query).length)) {
        res.status(400).send();
    }
    res.setHeader('Cache-Control', 'no-cache');
    await sequelize.authenticate().then(() => {
        res.status(200).send();
    }).catch(() => {
        res.status(503).send();
    });
    res.status(200).send();
}

