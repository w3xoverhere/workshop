from django.contrib import admin
from .models import MotherBoard, Processor, Videocard, RAM, ROM, SSD, PowerUnit, CoolerForProcessor
from announcement.admin import AnnouncementGenericStackedInline
import nested_admin

@admin.register(MotherBoard)
class MotherBoardAdmin(nested_admin.NestedModelAdmin):
    inlines = [AnnouncementGenericStackedInline]

@admin.register(Processor)
class ProcessorAdmin(nested_admin.NestedModelAdmin):
    inlines = [AnnouncementGenericStackedInline]


@admin.register(Videocard)
class VideocardAdmin(nested_admin.NestedModelAdmin):
    inlines = [AnnouncementGenericStackedInline]


@admin.register(RAM)
class RAMAdmin(nested_admin.NestedModelAdmin):
    inlines = [AnnouncementGenericStackedInline]


@admin.register(ROM)
class ROMAdmin(nested_admin.NestedModelAdmin):
    inlines = [AnnouncementGenericStackedInline]


@admin.register(SSD)
class SSDAdmin(nested_admin.NestedModelAdmin):
    inlines = [AnnouncementGenericStackedInline]


@admin.register(PowerUnit)
class PowerUnitAdmin(nested_admin.NestedModelAdmin):
    inlines = [AnnouncementGenericStackedInline]


@admin.register(CoolerForProcessor)
class CoolerForProcessorAdmin(nested_admin.NestedModelAdmin):
    inlines = [AnnouncementGenericStackedInline]

