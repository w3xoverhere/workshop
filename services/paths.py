'''
    Генерация путей для сохранения фаилов
'''


# Изображения объявлений
def image_directory(instance, filename):
    return 'announcement_images/{0}/{1}'.format(instance.announcement.pk, filename)


# Аватары пользователей
def avatar_path_upload(instance, filename):
    return 'avatars/{0}/{1}'.format(instance.auth_user.pk, filename)