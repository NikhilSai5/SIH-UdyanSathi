# Generated by Django 4.2.6 on 2023-11-04 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UdyanSaathiAPI', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Top10CitiesModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('City', models.CharField(default=' ', max_length=255)),
                ('AQI', models.IntegerField(default=0)),
                ('PM25', models.FloatField(default=0, max_length=10)),
                ('PM10', models.FloatField(default=0, max_length=10)),
                ('CO', models.FloatField(default=0, max_length=10)),
                ('OZONE', models.FloatField(default=0, max_length=10)),
                ('SO2', models.FloatField(default=0, max_length=10)),
                ('NO2', models.FloatField(default=0, max_length=10)),
                ('NH3', models.FloatField(default=0, max_length=10)),
            ],
        ),
        migrations.AlterField(
            model_name='pollutionmodel',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='stationmodel',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]