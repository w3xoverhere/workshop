# Generated by Django 4.1.6 on 2023-02-27 09:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('components', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Computer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, db_index=True, max_length=80, verbose_name='Имя компьютера(если есть)')),
                ('body', models.CharField(blank=True, max_length=80, null=True, verbose_name='Корпус компьютера(если есть)')),
                ('RAM', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='components.ram', verbose_name='ОЗУ')),
                ('ROM', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='components.rom', verbose_name='ПЗУ')),
                ('SSD', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='components.ssd', verbose_name='SSD')),
                ('cooler_for_processor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='components.coolerforprocessor', verbose_name='Кулер(процессор)')),
                ('mother_board', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='components.motherboard', verbose_name='Материнская плата')),
                ('power_unit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='components.powerunit', verbose_name='Блок питания')),
                ('processor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='components.processor', verbose_name='Процессор')),
                ('video_card', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='components.videocard', verbose_name='Видеокарта')),
            ],
            options={
                'verbose_name': 'Компьютер',
                'verbose_name_plural': 'Компьютеры',
            },
        ),
    ]
