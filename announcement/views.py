from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from . import serializers
from rest_framework import generics
from .models import Announcement
from rest_framework.permissions import IsAuthenticated

class AnnouncementPagination(PageNumberPagination): page_size = 4


class UserAnnouncementPagination(PageNumberPagination): page_size = 3


class AnnouncementListAPIView(generics.ListAPIView):
    serializer_class = serializers.AnnouncementListSerializer
    pagination_class = AnnouncementPagination

    def get_queryset(self):
        type = self.kwargs.get('type')
        if type == None:
            return Announcement.objects.filter(is_active=True).order_by('-published')
        return Announcement.objects.filter(is_active=True, tag_name=type).order_by('-published')


class AnnouncementDetailAPIView(generics.GenericAPIView):
    serializer_class = serializers.AnnouncementSerializer
    queryset = Announcement.objects.filter(is_active=True)

    def get_object(self):
        queryset = self.get_queryset()
        filter = {
            'tag_name': self.kwargs.get('tag_name'),
            'pk': self.kwargs.get('pk')
        }

        obj = get_object_or_404(queryset, tag_name=filter['tag_name'], pk=filter['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class UserAnnouncementsListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserAnnouncementSerializer
    pagination_class = UserAnnouncementPagination

    def get_queryset(self):
        id = self.kwargs.get('id')
        return Announcement.objects.filter(author=id).order_by('-published')
