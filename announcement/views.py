from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from . import serializers
from rest_framework import generics, pagination
from .models import Announcement


class AnnouncementPagination(PageNumberPagination): page_size = 6
class UserAnnouncementPagination(PageNumberPagination): page_size = 3


class AnnouncementListAPIView(generics.ListAPIView):
    serializer_class = serializers.AnnouncementSerializer
    pagination_class = AnnouncementPagination

    def get_queryset(self):
        type = self.kwargs.get('type')
        print(type)
        if type == None:
            return Announcement.objects.filter(is_active=True).order_by('-published')
        return Announcement.objects.filter(is_active=True, tag_name=type).order_by('-published')


class UserAnnouncementsListAPIView(generics.ListAPIView):
    serializer_class = serializers.UserAnnouncementSerializer
    pagination_class = UserAnnouncementPagination
    def get_queryset(self):
        id = self.kwargs.get('id')
        print(id)
        return Announcement.objects.filter(author_id=id).order_by('-published')
