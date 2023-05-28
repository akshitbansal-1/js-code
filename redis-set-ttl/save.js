const Redis = require('ioredis');
const client = new Redis();
const key = 'test';

const startTime = Date.now();
const offset = 30*1000; // 30 seconds from now, configure as needed

(async function() {
    for (let i = 0; i < 10; i++) {
        console.log(Date.now() + offset);
        await client.zadd(key, Date.now() + offset, i);
    }
    console.log('Saved');
    await client.zremrangebyscore(key, '-inf', startTime);
    console.log('Deleted old data');
})();
