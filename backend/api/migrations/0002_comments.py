# Generated by Django 5.1.1 on 2024-09-08 08:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(default='', max_length=300)),
                ('created_datetime', models.DateTimeField(auto_now_add=True)),
                ('crm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='api.crm')),
            ],
        ),
    ]
