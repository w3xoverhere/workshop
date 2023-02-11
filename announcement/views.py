from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


from . import serializers
from rest_framework import generics, pagination
from .models import Announcement

class AnnouncementPagination(PageNumberPagination):
        page_size = 6

class AnnouncementListAPIView(generics.ListAPIView):
        serializer_class = serializers.AnnouncementSerializer
        pagination_class = AnnouncementPagination

        def get_queryset(self):
                type = self.kwargs.get('type')
                print(type)
                if type == None:
                        return Announcement.objects.filter(is_active=True).order_by('-published')
                return Announcement.objects.filter(is_active=True, tag_name=type).order_by('-published')