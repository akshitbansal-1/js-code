To test this, run the following commands:

```
docker build -t node_env_dev .
docker build -t node_env_prod_2 --build-arg NODE_ENV=production .

docker images
// check image sizes
```