from django.core.exceptions import ValidationError

''' Валидаторы моделей '''


def validate_image_size(file):
    max_megabytes_size = 2
    if(file.size > 2 * 1024 * 1024):
        raise ValidationError('Максимальный размер 2Mb')