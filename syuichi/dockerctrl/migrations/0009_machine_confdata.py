# Generated by Django 5.0.1 on 2024-01-22 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dockerctrl', '0008_network_x_network_y'),
    ]

    operations = [
        migrations.AddField(
            model_name='machine',
            name='confdata',
            field=models.JSONField(default=dict),
        ),
    ]