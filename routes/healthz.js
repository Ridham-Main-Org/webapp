const express = require('express');
const router = express.Router();
const healthzController = require('../controllers/healthzcontroller');

router.get('/', healthzController.getHealthz);

router.all('/', (req, res) => {
    res.status(405).send();
})
router.all("*", (req, res) => {
    res.status(404).send();
})

module.exports = router;
