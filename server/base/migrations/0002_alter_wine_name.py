# Generated by Django 5.0 on 2023-12-31 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wine',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]
