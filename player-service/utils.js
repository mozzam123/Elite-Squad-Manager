const { kafkaProducer } = require("./config/kafkaConfig")

// Send kafka Message
exports.sendKafkaMessage = async (topic, message) => {
    try {
        await kafkaProducer.connect();
        await kafkaProducer.send({ topic: topic, messages: [{ value: JSON.stringify(message) }] });
        console.log(`Sent message to Kafka topic '${topic}': ${JSON.stringify(message)}`);

    } catch (error) {
        throw error
    }
    finally {
        await kafkaProducer.disconnect()
    }
}
