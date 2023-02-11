from django.shortcuts import render
from rest_framework import viewsets
# from .models import Announcement
# from .serializers import AnnouncementSerializer
from rest_framework import pagination


# class AnnouncementPagination(pagination.PageNumberPagination):
#     page_size = 5
#     page_size_query_param = 'page_size'
#     max_page_size = 10
#
#
# class AnnouncementViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Announcement.objects.all().order_by('-published')
#     serializer_class = AnnouncementSerializer
#     pagination_class = AnnouncementPagination
#