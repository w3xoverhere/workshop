from django.contrib import admin
from .models import AuthUser


@admin.register(AuthUser)
class AuthUserAdmin(admin.ModelAdmin):
    class Meta:
        list_display = ('email', 'name', 'avatar', 'country', 'birth_date', 'joined_date')