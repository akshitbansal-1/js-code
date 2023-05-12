const app = require('express')();

app.get('/', async (req, res) => {
    // some work
    await new Promise(resolve => {
        setTimeout(resolve, 100);
    });

    // send response
    res.send('Hi');
});

app.listen(3000);