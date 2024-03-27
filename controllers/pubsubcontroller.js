// Import the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');
const logger = require('../logger'); // Ensure logger is properly implemented

// Create a Pub/Sub client; cache this for further use
const pubSubClient = new PubSub();

async function publishMessage(topicName, data) {
    logger.debug(`Inside publishMessage method ${topicName}`);
    const dataBuffer = Buffer.from(data);

    try {
        // Publish the message and await the result
        await pubSubClient.topic(topicName).publishMessage({ data: dataBuffer });
        logger.info(`Message published`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        logger.error("Received error while publishing message to topic inside publishMessage");
    }
}

module.exports = { publishMessage };
