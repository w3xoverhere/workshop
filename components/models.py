from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.postgres import fields
from django.db import models
from . import models_vars
from announcement.models import Announcement


# Базовая структура компонентов
class BaseComponent(models.Model):
    name = models.CharField(max_length=120, db_index=True, verbose_name='Название')

    def __str__(self):
        return self.name


class MotherBoard(BaseComponent):
    form_factor = models.CharField(max_length=10,choices=models_vars.MOTHER_BOARD_FORM_FACTOR,
                                   verbose_name='Форм-фактор')
    socket = models.CharField(max_length=10, choices=models_vars.SOCKETS, verbose_name='Сокет')
    chipset = models.CharField(max_length=5, verbose_name='Чипсет')
    # Связующие объявление
    announcements = GenericRelation(Announcement, related_query_name='motherboard', related_name='motherboards')


    class Meta:
        ordering = ['-name']
        verbose_name = 'Материнская плата'
        verbose_name_plural = 'Материнские платы'


class Processor(models.Model): #Без базового компонента, т.к имеет другую структуру
    # Общие параметры
    manufacturer = models.CharField(max_length=10,choices=models_vars.PROCESSORS_MANUFACTURER, db_index=True,
                                    verbose_name='Производитель')
    package = models.CharField(max_length=3, choices=models_vars.PROCESSORS_PACKAGE, verbose_name='Упаковка')
    generation = models.CharField(max_length=20, choices=models_vars.PROCESSORS_GENERATIONS, db_index=True,
                              verbose_name='Поколение')
    series = models.CharField(max_length=40, verbose_name='Серия')
    socket = models.CharField(max_length=10, choices=models_vars.SOCKETS, verbose_name='Сокет')
    # Ядро и архитектура
    frequency = fields.DecimalRangeField(default_bounds='[]',verbose_name='Частота(минимальная и максимальная)')
    kernels = models.PositiveIntegerField(verbose_name='Кол-во ядер')
    streams = models.PositiveIntegerField(verbose_name='Кол-во потоков')
    cache_l2 = models.PositiveIntegerField(verbose_name='Кэш L2')
    cache_l3 = models.PositiveIntegerField(verbose_name='Кэш L3')
    tech_process = models.PositiveIntegerField(verbose_name='Техпроцесс')
    # ОЗУ
    type_ram = models.CharField(max_length=6, choices=models_vars.PROCESSORS_TYPE_RAM, verbose_name='Поддерживаемая ОЗУ')
    max_ram_size = models.PositiveIntegerField(verbose_name='Максимальное кол-во ОЗУ')
    max_ram_frequency = models.PositiveIntegerField(verbose_name='Максимальная частота ОЗУ')
    ram_canals = models.PositiveIntegerField(verbose_name='Кол-во каналов ОЗУ')
    # Тепловые хар-ки
    TDP = models.PositiveIntegerField(verbose_name='TDP')
    # Связующее объявление
    announcements = GenericRelation(Announcement, related_query_name='processor', related_name='processors')

    def __str__(self):
        return self.manufacturer + ' ' + self.generation + ' ' + self.series

    class Meta:
        ordering = ['-generation']
        verbose_name = 'Процессор'
        verbose_name_plural = 'Процессоры'


class Videocard(BaseComponent):
    # Основные хар-ки
    manufacturer = models.CharField(max_length=10, choices=models_vars.VIDEOCARD_MANUFACTURER, verbose_name='Производитель')
    GPU = models.CharField(max_length=50, db_index=True, verbose_name='Графический процессор')
    frequency_video_chip = models.PositiveIntegerField(verbose_name='Частота видео чипа')
    microarchitecture = models.CharField(max_length=50, verbose_name='Микроархитектура')
    tech_process = models.PositiveIntegerField(verbose_name='Техпроцесс')

    # Память
    memory = models.PositiveIntegerField(db_index=True, verbose_name='Объём памяти')
    memory_bus_width = models.PositiveIntegerField(verbose_name='Ширина шины памяти')
    memory_bandwidth = models.PositiveIntegerField(verbose_name='Пропускная способность шины')
    type_memory = models.CharField(max_length=5, choices=models_vars.VIDEOCARD_TYPE_OF_MEMORY, verbose_name='Тип памяти')
    # Блоки
    TMU = models.PositiveIntegerField(verbose_name='Кол-во текстурных блоков')
    ROP = models.PositiveIntegerField(verbose_name='Кол-во блоков растеризации')

    # Остальные хар-ки
    form_factor = models.CharField(max_length=20, default='PCI-E x16', verbose_name='Форм-фактор разъема подключения')
    video_connectors = fields.ArrayField(models.CharField(max_length=20), verbose_name='Видеоразъемы')
    ray_tracing = models.BooleanField(default=False, verbose_name='Поддержка трассировки лучей')

    # Связующее объявление
    announcements = GenericRelation(Announcement, related_query_name='videocard', related_name='videocards')

    class Meta:
        ordering = ['-memory']
        verbose_name = 'Видеокарта'
        verbose_name_plural = 'Видеокарты'


class RAM(BaseComponent):
    # Основные хар-ки
    type = models.CharField(max_length=5, choices=models_vars.RAM_TYPE, verbose_name='Тип памяти')
    form_factor = models.CharField(max_length=10, choices=models_vars.RAM_FORM_FACTOR, verbose_name='Форм-фактор')
    capacity = models.PositiveIntegerField(db_index=True, verbose_name='Объём')
    frequency = models.PositiveIntegerField(db_index=True, verbose_name='Тактовая частота')

    # Тайминги
    CL = models.PositiveIntegerField(blank=True, null=True, verbose_name='CAS Latency (CL)')
    tRCD = models.PositiveIntegerField(blank=True, null=True, verbose_name='RAS to CAS Delay (tRCD)')
    tRP = models.PositiveIntegerField(blank=True, null=True, verbose_name='Row Precharge Delay (tRP)')
    tRAS = models.PositiveIntegerField(blank=True, null=True, verbose_name='Activate to Precharge Delay (tRAS)')

    # Связующее объявление
    announcements = GenericRelation(Announcement, related_query_name='ram', related_name='rams')
    class Meta:
        ordering = ['-capacity']
        verbose_name = 'ОЗУ'
        verbose_name_plural = 'ОЗУ'


class ROM(BaseComponent):
    interface = models.CharField(max_length=10, choices=models_vars.ROM_INTERFACE, verbose_name='Интерфейс')
    form_factor = models.CharField(max_length=10, choices=models_vars.ROM_FORM_FACTOR, verbose_name='Форм-фактор')
    capacity = models.PositiveIntegerField(verbose_name='Ёмкость')
    write_read_speed = models.PositiveIntegerField(verbose_name='Скорость чтения/записи')
    buffer_capacity = models.PositiveIntegerField(verbose_name='Объём буффера')
    noise_level = models.PositiveIntegerField(verbose_name='Уровень шума')
    spindle_speed = models.PositiveIntegerField(verbose_name='Скорость вращения шпинделя')

    # Связующее объявление
    announcements = GenericRelation(Announcement, related_query_name='rom', related_name='roms')
    class Meta:
        verbose_name = 'ПЗУ'
        verbose_name_plural = 'ПЗУ'


class SSD(BaseComponent):
    # Основные хар-ки
    capacity = models.PositiveIntegerField(verbose_name='Ёмкость')
    interface = models.CharField(max_length=12, choices=models_vars.SSD_INTERFACE, verbose_name='Интерфейс')
    read = models.PositiveIntegerField(verbose_name='Скорость чтения')
    write = models.PositiveIntegerField(verbose_name='Скорость записи')
    # Конфигурация
    bits_per_cell = models.CharField(max_length=5, choices=models_vars.SSD_BITS_PER_CELL, verbose_name='Бит на ячейку')
    structure = models.CharField(max_length=15, choices=models_vars.SSD_STRUCTURE_MEMORY,
                                 verbose_name='Структура памяти')
    # Дополнительно
    NVMe = models.BooleanField(verbose_name='Поддержка NVMe')
    DRAM_buffer = models.BooleanField(verbose_name='DRAM буфер')
    m2_key = models.CharField(max_length=3, choices=models_vars.SSD_M2_KEY, blank=True, null=True,
                              verbose_name='Тип ключа(M2)')
    TBW = models.PositiveIntegerField(verbose_name='Максимальный ресурс записи')

    # Связующее объявление
    announcements = GenericRelation(Announcement, related_query_name='ssd', related_name='ssds')

    class Meta:
        ordering = ['-capacity']
        verbose_name = 'SSD'
        verbose_name_plural = 'SSD'

class PowerUnit(BaseComponent):
    # Основные хар-ки
    power = models.PositiveIntegerField(verbose_name='Мощность')
    standard = models.CharField(max_length=20, verbose_name='Стандарт')
    PFC = models.BooleanField(verbose_name='Коррекция коэффициента мощности ')
    certificate_80_plus = models.CharField(max_length=10, verbose_name='Сертификация 80 plus')

    # Разъёмы
    mb_conn = models.CharField(max_length=10, verbose_name='Разъём питания материнской платы')
    pin4_cpu = models.PositiveIntegerField(blank=True, verbose_name='Количество разъемов 4-pin CPU')
    pin4_4_cpu = models.PositiveIntegerField(blank=True, verbose_name='Кол-во разъемов 4+4 pin CPU')
    pin6_2_pci = models.PositiveIntegerField(blank=True, verbose_name='Количество разъемов 6+2-pin PCI-E')
    pin15_sata = models.PositiveIntegerField(blank=True, verbose_name='Количество разъемов 15-pin SATA')


    # Остальное
    fan_diameter = models.PositiveIntegerField(verbose_name='Диаметр вентилятора')

    # Связующее объявление
    announcements = GenericRelation(Announcement, related_query_name='power_unit', related_name='power_units')
    class Meta:
        ordering = ['-power']
        verbose_name = 'Блок питания'
        verbose_name = 'Блоки питания'


class CoolerForProcessor(BaseComponent):
    type = models.CharField(max_length=25, choices=models_vars.COOLER_TYPE, verbose_name='Тип')
    sockets = fields.ArrayField(models.CharField(max_length=10, choices=models_vars.SOCKETS), verbose_name='Сокет(ы)')
    material = models.CharField(max_length=40, verbose_name='Материал радиатора')
    MPD = models.PositiveIntegerField(verbose_name='Максимальная рассеиваемая мощность')
    count_fans = models.PositiveIntegerField(verbose_name='Кол-во вентиляторов')
    rotational_speed = fields.DecimalRangeField(default_bounds='[]',verbose_name='Скорость вращения')
    noise = fields.DecimalRangeField(default_bounds='[]',verbose_name='Уровень шума')

    # Связующее объявление
    announcements = GenericRelation(Announcement, related_query_name='cooler', related_name='coolers')
    class Meta:
        ordering = ['-MPD']
        verbose_name = 'Кулер(процессор)'
        verbose_name_plural = 'Кулеры(процессор)'

