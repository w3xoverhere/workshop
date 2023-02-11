from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from components.models import MotherBoard, Processor, Videocard, RAM, ROM, SSD, PowerUnit, CoolerForProcessor
from announcement.models import Announcement


class Computer(models.Model):
    name = models.CharField(blank=True, db_index=True, max_length=80, verbose_name='Имя компьютера(если есть)')
    body = models.CharField(blank=True, null=True, max_length=80, verbose_name='Корпус компьютера(если есть)')
    mother_board = models.ForeignKey(MotherBoard, db_index=True, blank=True, null=True, on_delete=models.SET_NULL,
                                     verbose_name='Материнская плата')
    video_card = models.ForeignKey(Videocard, db_index=True, blank=True, null=True, on_delete=models.SET_NULL,
                                   verbose_name='Видеокарта')
    processor = models.ForeignKey(Processor, blank=True, null=True, on_delete=models.SET_NULL, verbose_name='Процессор')
    RAM = models.ForeignKey(RAM, db_index=True, blank=True, null=True, on_delete=models.SET_NULL,
                                   verbose_name='ОЗУ')
    ROM = models.ForeignKey(ROM, db_index=True, blank=True, null=True, on_delete=models.SET_NULL,
                                   verbose_name='ПЗУ')
    SSD = models.ForeignKey(SSD, db_index=True, blank=True, null=True, on_delete=models.SET_NULL,
                                   verbose_name='SSD')
    power_unit = models.ForeignKey(PowerUnit, db_index=True, blank=True, null=True, on_delete=models.SET_NULL,
                                   verbose_name='Блок питания')
    cooler_for_processor = models.ForeignKey(CoolerForProcessor, db_index=True, blank=True, null=True, on_delete=models.SET_NULL,
                                   verbose_name='Кулер(процессор)')
    announcements = GenericRelation(Announcement, related_query_name='computer', related_name='computers')

    def __str__(self):
        if self.name:
            return str(self.pk) + " " + self.name
        else:
            return str(self.pk) + " " + self.video_card + " " + self.processor

    class Meta:
        verbose_name = 'Компьютер'
        verbose_name_plural = 'Компьютеры'



