from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Announcement, Images
from computers.serializers import ComputerModelSerializer
from computers.models import Computer
from components.models import MotherBoard, Processor, Videocard, RAM, ROM, SSD, PowerUnit, CoolerForProcessor
from components.serializers import MotherBoardModelSerializer, ProcessorModelSerializer, VideocardModelSerializer, RAMModelSerializer, ROMModelSerializer, SSDModelSerializer, PowerUnitModelSerializer, CoolerForProcessorModelSerializer
from generic_relations.relations import GenericRelatedField


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('name',)


class AnnouncementImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ('images',)


class UserAnnouncementSerializer(serializers.ModelSerializer):
    images = AnnouncementImagesSerializer(many=True)

    class Meta:
        model = Announcement
        fields = ['pk', 'tag_name', 'title', 'description', 'images', 'price', 'published', 'is_active']


class AnnouncementListSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    images = AnnouncementImagesSerializer(many=True)
    class Meta:
        model = Announcement
        exclude = ['object_id']

class AnnouncementSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    images = AnnouncementImagesSerializer(many=True)
    content_object = GenericRelatedField({
        Computer: ComputerModelSerializer(),
        MotherBoard: MotherBoardModelSerializer(),
        Processor: ProcessorModelSerializer(),
        Videocard: VideocardModelSerializer(),
        RAM: RAMModelSerializer(),
        ROM: ROMModelSerializer(),
        SSD: SSDModelSerializer(),
        PowerUnit: PowerUnitModelSerializer(),
        CoolerForProcessor: CoolerForProcessorModelSerializer(),

    })

    class Meta:
        model = Announcement
        fields = ['pk', 'tag_name', 'title', 'description', 'images', 'content_object', 'price', 'favorite_by', 'author', 'published', 'is_active']