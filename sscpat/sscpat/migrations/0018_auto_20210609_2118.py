# Generated by Django 2.2.10 on 2021-06-09 21:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sscpat', '0017_auto_20210609_2116'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inscriptiondocument',
            old_name='reviewer_date',
            new_name='reviewed_date',
        ),
    ]
