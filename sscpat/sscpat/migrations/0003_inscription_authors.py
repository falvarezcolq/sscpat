# Generated by Django 2.2.10 on 2021-08-27 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sscpat', '0002_auto_20210824_2121'),
    ]

    operations = [
        migrations.AddField(
            model_name='inscription',
            name='authors',
            field=models.ManyToManyField(related_name='sprojects', to='sscpat.Student'),
        ),
    ]
