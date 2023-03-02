# Generated by Django 4.1.6 on 2023-02-28 14:04

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('announcement', '0003_alter_announcement_favorite_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='announcement',
            name='favorite_by',
            field=models.ManyToManyField(blank=True, related_name='favorite_ann', to=settings.AUTH_USER_MODEL, verbose_name='Добавили в избранное'),
        ),
    ]