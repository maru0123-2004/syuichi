# Generated by Django 5.0 on 2024-01-15 21:40

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dockerctrl', '0003_machine_owner_alter_machine_description_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Network',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('network_id', models.CharField(max_length=100)),
                ('network', models.GenericIPAddressField()),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(default='', max_length=300)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='networks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Port',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip_addr', models.GenericIPAddressField()),
                ('machine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ports', to='dockerctrl.machine')),
                ('network', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ports', to='dockerctrl.network')),
            ],
            options={
                'unique_together': {('network', 'machine')},
            },
        ),
        migrations.AddField(
            model_name='network',
            name='machines',
            field=models.ManyToManyField(related_name='networks', through='dockerctrl.Port', to='dockerctrl.machine'),
        ),
    ]
