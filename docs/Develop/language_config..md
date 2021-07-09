# Translate text on other language

## translate on Spanish language

This command create a file whit text to translate

```bash
docker-compose -f local.yml run --rm django python manage.py  makemessages --locale es -i venv
```

Carpeta y archivos creados
```
- locale
    |- es
        |- LC_MESSAGES
            |- django.po

```

File django.po has the text to translate, you should open this file and translate sentences

### Convert file django.po to binary for python interpreter
```
docker-compose -f local.yml run --rm django python manage.py  compilemessages --locale=ES
```

#### Success


### Other relationated commands

Traducción de django

```bash
// Ubunto 
Sudo apt-get install gettext
// Osx
Brew install gettext —force
```

Comando en el entornos virtual
``` 
>> python django-admin makemessages --locale es
>> python django-admin compilemessages
```

If we have a problem

```
python manage.py  makemessages --locale es -i venv
```
