const axios = require('axios').default;

async function sendReq(i) {
    const startTime = new Date();
    const res = await axios.get('http://localhost:3000');
    console.log(`Time taken for ${i} request`, Date.now() - startTime);
    return res;
}

// Send first request and note down the start time.
sendReq(1);

// After first request do some CPU intensive task.
for (let i = 0; i < 1e9; i++) {}

// Send second request with no following CPU intensive task
sendReq(2);

