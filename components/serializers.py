from rest_framework import serializers
from . import models


class MotherBoardModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MotherBoard
        fields = '__all__'


class ProcessorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Processor
        exclude = ['max_ram_frequency', 'max_ram_size']


class VideocardModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Videocard
        exclude = ['TMU', 'ROP', 'ray_tracing']


class RAMModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RAM
        fields = '__all__'


class ROMModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ROM
        fields = '__all__'


class SSDModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SSD
        fields = '__all__'


class PowerUnitModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PowerUnit
        exclude = ['fan_diameter']


class CoolerForProcessorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CoolerForProcessor
        exclude = ['MPD', 'noise']