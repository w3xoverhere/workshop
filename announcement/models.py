from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.core.validators import FileExtensionValidator
from services.paths import image_directory
from services.validators import validate_image_size
from django.db import models


# Объявление
class Announcement(models.Model):
    tag_name = models.CharField(max_length=20, db_index=True, verbose_name='Тег')
    object_id = models.PositiveIntegerField()
    title = models.CharField(max_length=190, verbose_name='Название', db_index=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    content_object = GenericForeignKey('content_type', 'object_id')
    description = models.TextField(verbose_name='Описание')
    price = models.PositiveIntegerField(db_index=True, verbose_name='Цена')
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='announcements', verbose_name='Пользователь')
    published = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')
    updated = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')
    is_active = models.BooleanField(default=True, verbose_name='Опубликовано')

    def __str__(self):
        return str(self.pk) + " " + self.title

    class Meta:
        verbose_name = 'Объявление'
        verbose_name_plural = 'Обьявления'
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]


class Images(models.Model):
    images = models.ImageField(upload_to=image_directory, validators=
    [
        FileExtensionValidator(allowed_extensions=['jpg', 'png']),
        validate_image_size
    ],
                               verbose_name='Изображения товара')
    announcement = models.ForeignKey(Announcement, on_delete=models.CASCADE, related_name='images')

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'
