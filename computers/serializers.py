from rest_framework import serializers
from .models import Computer


class ComputerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Computer
        fields = '__all__'