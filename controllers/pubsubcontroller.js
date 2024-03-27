// Import the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');
const logger = require('../logger'); // Ensure logger is properly implemented

// Create a Pub/Sub client; cache this for further use
const pubSubClient = new PubSub();

async function publishMessage(topicNameOrId, data) {
    logger.debug("Inside publishMessage method");
    const dataBuffer = Buffer.from(data);

    try {
        // Publish the message and await the result
        const [messageId] = await pubSubClient.topic(topicNameOrId).publishMessage(dataBuffer);
        console.log(`Message ${messageId} published.`);
        logger.info(`Message ${messageId} published`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        logger.error("Received error while publishing message to topic inside publishMessage");
    }
}

module.exports = { publishMessage };
