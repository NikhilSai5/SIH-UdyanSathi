# Generated by Django 5.0 on 2023-12-17 16:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("UdyanSaathiAPI", "0002_alter_aqicalendarmodel_pol_date_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pollutionmodel",
            name="Pol_Date",
            field=models.CharField(default=" ", max_length=500),
        ),
    ]