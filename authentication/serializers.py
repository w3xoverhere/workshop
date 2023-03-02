from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.serializers import StringRelatedField, Serializer
from rest_framework import serializers
from announcement.serializers import AnnouncementListSerializer

User = get_user_model()

class CurrentUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'name', 'email', 'country', 'avatar', 'birth_date')


class AuthUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password', 'country', 'avatar', 'birth_date')


class AuthUserFavoriteSerializer(UserSerializer):
    favorite_ann = AnnouncementListSerializer(many=True)
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('favorite_ann',)
        depth = 1
