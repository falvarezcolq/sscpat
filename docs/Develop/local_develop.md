# Local development
## build
```
docker-compose -f local.yml build
docker-compose -f local.yml up
```

## run django on anther terminal
```
docker-compose -f local.yml ps 
docker rm -f sscpat_django_1

docker-compose -f local.yml run --rm --service-ports django
```


## run react app

```
cd sscpatfront/
npm install
npm start

```
