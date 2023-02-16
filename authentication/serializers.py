from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from djoser import serializers
from rest_framework.serializers import StringRelatedField

User = get_user_model()

class CurrentUserSerializer(serializers.UserSerializer):
    class Meta(serializers.UserSerializer.Meta):
        model = User
        fields = ('id', 'name', 'email', 'country', 'avatar', 'birth_date')


class AuthUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password', 'country', 'avatar', 'birth_date')

