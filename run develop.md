# Manual para poner en ejecucion entorno de pruebas



# ingresar a la carpeta 

```bash
cd  sscpat/

docker-compose -f local.yml build
docker-compose -f local.yml up
docker-compose -f local.yml down
```


## ingresar desde otra terminar

Dar de baja el contenedor de django para luego levantar como servidor de pruebas

```
docker rm -f sscpat_local_django
```


Hacer correr el contenedor de django con el siguiente comando
```bash 
docker-compose -f local.yml run --rm --service-ports django

ctrl+c #para salir
```


Si es la primera vez, de seguro no se tiene las tablas creadas en la base de datos,

para tener la tablas ejecutar el siguiente comando

```
docker-compose -f local.yml run --rm django python manage.py migrate
```

## Instalar
node en su version v14.19.1

```
cd  sscpat/sscpatfront/
npm start
```

