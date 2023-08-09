const { Partitioners } = require('kafkajs');
const kafka = require('./kafka-connect');
// to see all the options: https://kafka.js.org/docs/producing#options
const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
});

const run = async () => {
  await producer.connect();
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 4; i++) {

        await producer.send({
            topic: "test-topic",
            messages: [{ 
                // messages structure: https://kafka.js.org/docs/producing#message-structure
                value: i.toString(),
                // key: j.toString(),
                // headers: {
                //     messageID: ''
                // },
                // partition: 0,
            }],
            // compression: 'gzip',
            // acks: -1,
            // timeout: 30000,
        });
        }
    }
}

run();