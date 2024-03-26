// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');
const logger = require('../logger');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function publishMessage(topicNameOrId, data) {
    logger.info("inside publishMessage method");
    const dataBuffer = Buffer.from(data);

    try {
    const messageId = await pubSubClient
        .topic(topicNameOrId)
        .publishMessage({data: dataBuffer});
        console.log(`Message ${messageId} published.`);
        logger.info('Message published');
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        logger.error(" Received error while publishing message to topic inside publishMessage");
        process.exitCode = 1;
    }
}

module.exports = { publishMessage };