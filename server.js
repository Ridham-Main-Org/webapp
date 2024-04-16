const express = require("express");
const healthzRoutes = require('./routes/healthz');
const userRoutes = require('./routes/user');
const app = express();
const { User } = require('./models/User');
// const logger = require('./logger');

const { getLogger } = require('./logger');
const logger = getLogger();

app.use(express.json());

app.use('/healthz', healthzRoutes);
app.use('/v5/user', userRoutes);


app.listen(3000, () => {
    console.log("Server listening on port 3000")
    logger.info("Server listening on port 3000");
});

module.exports = app;
