# Generated by Django 5.0 on 2024-01-06 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_add_deleted_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='order_details',
            field=models.ManyToManyField(through='base.OrderDetails', to='base.wine'),
        ),
    ]
