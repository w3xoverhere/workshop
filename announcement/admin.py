from django.contrib import admin
from django.contrib.contenttypes.admin import GenericStackedInline, GenericInlineModelAdmin
import nested_admin


from .models import Announcement, Images


class ImagesStackedInline(nested_admin.NestedStackedInline):
    model = Images
    extra = 0


class AnnouncementGenericStackedInline(nested_admin.NestedGenericStackedInline):
    inlines = (ImagesStackedInline, )
    model = Announcement
    extra = 0

class ProductGenericInlineModelAdmin(GenericInlineModelAdmin):
    model = Announcement
@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    pass