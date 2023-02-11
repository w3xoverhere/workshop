from django.contrib import admin
from .models import Computer
from django.contrib.contenttypes.admin import GenericTabularInline
from announcement.admin import AnnouncementGenericStackedInline
import nested_admin


@admin.register(Computer)
class ComputerAdmin(nested_admin.NestedModelAdmin):
    inlines = [AnnouncementGenericStackedInline, ]

