# Generated by Django 2.2.10 on 2021-08-05 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sscpat', '0002_auto_20210803_1500'),
    ]

    operations = [
        migrations.AddField(
            model_name='tracingstudent',
            name='date_month',
            field=models.DateField(null=True, verbose_name='date uploaded'),
        ),
    ]