# Generated by Django 3.2.9 on 2021-11-30 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cookbook', '0161_alter_shoppinglistentry_food'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpreference',
            name='csv_delim',
            field=models.CharField(default=',', max_length=2),
        ),
        migrations.AddField(
            model_name='userpreference',
            name='csv_prefix',
            field=models.CharField(blank=True, max_length=3),
        ),
    ]
