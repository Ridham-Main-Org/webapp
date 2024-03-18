const express = require('express');
const router = express.Router();
const healthzController = require('../controllers/healthzcontroller');
const logger = require('../logger');

router.get('/', healthzController.getHealthz);

router.all('/', (req, res) => {
    logger.error("Wrong request type for Healthz");
    res.status(405).send();
})
router.all("*", (req, res) => {
    logger.error("Wrong api endpoint for Healthz");
    res.status(404).send();
})

module.exports = router;
