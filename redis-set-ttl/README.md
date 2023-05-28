I am using local redis here. You can configure your redis client if you have
a remote redis server.

RUN
```
npm ci
node save.js
node get.js
// after sometime, again run
node get.js

```