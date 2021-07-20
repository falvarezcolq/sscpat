# Deployment

## install programs
### Update S.O.
### Install Docker
### Install Git
### Install others

## Run project
### download

### copy envs
Create files with the content proporcionated from .envs/.production on local
```shell script
cd .envs
mkdir .production
cd .production

vim .django
vim .postgres
vim .react

```

### Build containers
```shell script
sudo docker-compose -f production.yml build
sudo docker-compose -f production.yml run --rm django python manage.py migrate
sudo docker-compose -f production.yml up
```


### Create super user

```shell script
docker-compose -f production.yml run --rm django python manage.py createsuperuser
```

user: admin
pass: aeumsa123$

### Update user on admin django
enter to  http://apisscpat.aeumsa.com/Un1XeDjB27DC9JBMdG9CO9qc97D9Zbaz/
1. login with user and password
2. select users
3. Enter to "admin" user
4. Change type user from default student to ADMIN and save
