from django.contrib.auth import get_user_model
from django.test import TestCase
from django.contrib.contenttypes.models import ContentType
from ..models import Announcement
from computers.models import Computer
from components.models import MotherBoard


class AnnouncementTestClass(TestCase):
    '''
        Создаём объекты компьютера cm и материнской платы mb.
        Проверяем добавление объявления
    '''
    mb = MotherBoard.objects.create(
        name='ASUS PRIME A320M-K', form_factor='microATX',
        socket='AM4', chipset='A320'
    )

    cm1 = Computer.objects.create(
        name='DEXP Atlas H366', mother_board=mb,
        video_card='GeForce GT 710', processor='Intel Core i5-11400F',
        RAM='16 ГБ DDR4', SSD='240 ГБ',
        power_unit='unknown', cooling_system='unknown',
    )

    cm2 = Computer.objects.create(
        name='HP Pavilion TP01-2074ur', mother_board=mb, # Пофиг, что intel сокет для amd xD
        video_card='GeForce RTX 3060', processor='Ryzen 5 5600G',
        RAM='8 ГБ DDR4', SSD='256 ГБ',
        power_unit='unknown', cooling_system='unknown',
    )


    # Получаем content type для материнской платы и компьютера
    ct_mb = ContentType.objects.get_for_model(MotherBoard)
    ct_cm = ContentType.objects.get_for_model(Computer)


    def test_for_ann_creation(self):
        # Создаём автора для объявлений
        User = get_user_model()
        user = User.objects.create_user(username='test', password='12345')

        # Создаём объявления
        ann1 = Announcement.objects.create(
            object_id=self.mb.id, title='Продам материнскую плату',
            content_type=self.ct_mb, content_object=self.mb,
            description='Владею 2 года.', price=4500, author=user,
            is_active=True
        )
        ann2 = Announcement.objects.create(
            object_id=self.cm1.id, title='Продам компьютер',
            content_type=self.ct_cm, content_object=self.cm1,
            description='Состояние идеальное.', price=25000, author=user,
            is_active=True
        )

        ann3 = Announcement.objects.create(
            object_id=self.cm1.id, title='Продам игровой ПК',
            content_type=self.ct_cm, content_object=self.cm1,
            description='Топ для игр.', price=4500, author=user,
            is_active=True
        )

        ann4 = Announcement.objects.create(
            object_id=self.cm2.id, title='Игровой компьютер',
            content_type=self.ct_cm, content_object=self.cm2,
            description='Тянет всё.', price=90000, author=user,
            is_active=True
        )

        #Проверяем, что объявления привязались с товарам
        self.assertEqual(self.mb.announcements.count(), 1)
        print('Announcement attach complete #1')
        self.assertEqual(self.cm1.announcements.count(), 2)
        print('Announcement attach complete #2')
        self.assertEqual(self.cm2.announcements.count(), 1)
        print('Announcement attach complete #3')