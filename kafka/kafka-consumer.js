const kafka = require('./kafka-connect');
const consumer = kafka.consumer({ groupId: 'test-group', });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        key: message.key?.toString(),
        value: message.value.toString(),
      });
    },
  });
}

// Perform graceful shutdown on process termination signal
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM signal. Gracefully shutting down...');
    await consumer.stop();
    process.exit(0);
});
run();