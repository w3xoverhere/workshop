from rest_framework import serializers
from .models import Computer




class ComputerModelSerializer(serializers.ModelSerializer):
    mother_board = serializers.CharField()
    video_card = serializers.CharField()
    processor = serializers.CharField()
    RAM = serializers.CharField()
    ROM = serializers.CharField()
    SSD = serializers.CharField()
    power_unit = serializers.CharField()
    cooler_for_processor = serializers.CharField()
    class Meta:
        model = Computer
        fields = '__all__'
