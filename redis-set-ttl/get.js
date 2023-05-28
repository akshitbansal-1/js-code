const Redis = require('ioredis');
const client = new Redis();

const key = 'test';
client.zrangebyscore(key, Date.now(), 'inf', (err, members) => {
    if (err) {
      console.error('Error retrieving sorted set members by score:', err);
    } else {
      console.log('Sorted set members ordered by score:', members);
    }
});