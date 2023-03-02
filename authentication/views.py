from django.contrib.auth import get_user_model
from rest_framework.mixins import DestroyModelMixin
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK
from rest_framework.views import APIView
from rest_framework import generics
from .serializers import AuthUserFavoriteSerializer
from announcement.models import Announcement
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class FavoriteCountAPIView(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request, format=None, *args, **kwargs):
        id = kwargs.get('id')
        favorite_count = User.objects.get(pk=id).favorite_ann.count()
        return Response(favorite_count)


class FavoriteList(generics.ListCreateAPIView, DestroyModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = AuthUserFavoriteSerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        id = kwargs.get('id')
        queryset = User.objects.get(pk=id)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        id = kwargs.get('id')
        user = User.objects.get(pk=id)
        ann = Announcement.objects.get(pk=request.data['announcement_id'])
        user.favorite_ann.add(ann)
        return Response({}, status=HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        id = kwargs.get('id')
        user = User.objects.get(pk=id)
        ann = Announcement.objects.get(pk=request.data['announcement_id'])
        ann.favorite_by.remove(user)
        return Response({'removed': ann.pk}, status=HTTP_200_OK)
