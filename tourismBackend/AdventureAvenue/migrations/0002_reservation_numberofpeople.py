# Generated by Django 5.0.4 on 2024-04-29 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AdventureAvenue', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='numberOfPeople',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
