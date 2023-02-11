from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from announcement.views import AnnouncementListAPIView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('api/v1/announcements/<str:type>', AnnouncementListAPIView.as_view()),
    path('api/v1/announcements/', AnnouncementListAPIView.as_view()),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
    path('admin/', admin.site.urls),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)