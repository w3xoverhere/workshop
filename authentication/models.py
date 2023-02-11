from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.validators import FileExtensionValidator
from django.db import models
from services.paths import avatar_path_upload
from services.validators import validate_image_size


class AuthUserManager(BaseUserManager):
    ''' Переопределённое создание пользователя '''
    def create_superuser(self, email, name, country, password=None):
        if not email:
            raise ValueError('У пользователя должна быть почта')
        if not country:
            raise ValueError('У пользователя должна быть указана страна')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, country=country)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        return user


    def create_user(self, email, name, country, password=None, avatar='', birth_date=None):
        if not email:
            raise ValueError('У пользователя должна быть почта')
        if not country:
            raise ValueError('У пользователя должна быть указана страна')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, country=country, avatar=avatar, birth_date=birth_date)
        user.set_password(password)
        user.save()

        return user


class AuthUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=60, unique=True)
    name = models.CharField(max_length=50, db_index=True)
    avatar = models.ImageField(upload_to=avatar_path_upload, blank=True, null=True,
                               validators=[
                                   FileExtensionValidator(allowed_extensions=['jpg', 'png']),
                                   validate_image_size]
                               )
    country = models.CharField(max_length=70)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    birth_date = models.DateField(blank=True, null=True)
    joined_date = models.DateTimeField(auto_now_add=True)

    '''Основные настройки работы с моделью пользователя'''
    objects = AuthUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'country']

    ''' Получение имени '''
    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.name