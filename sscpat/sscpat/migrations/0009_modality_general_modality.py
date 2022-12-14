# Generated by Django 2.2.10 on 2022-01-14 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sscpat', '0008_modality_document_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='modality',
            name='general_modality',
            field=models.CharField(choices=[('0', 'THESIS'), ('1', 'DEGREE PROJECT'), ('2', 'DEGREE EXAM'), ('3', 'WORK DIRECTED'), ('4', 'EXCELLENCE'), ('6', 'OTHER')], default=6, max_length=2),
        ),
    ]