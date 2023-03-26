from rest_framework import serializers
from . import models


class MotherBoardModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MotherBoard
        fields = '__all__'


class ProcessorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Processor
        fields = '__all__'

class VideocardModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Videocard
        fields = '__all__'


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
        fields = '__all__'


class CoolerForProcessorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CoolerForProcessor
        fields = '__all__'
