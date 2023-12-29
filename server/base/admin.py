from django.contrib import admin
from .models import User, Wine, WineColor, WineTaste, Country
from django.contrib.auth.admin import UserAdmin

class MyUserAdmin(UserAdmin):
    model = User

    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('role',)}),
    )

admin.site.register(User, MyUserAdmin)
admin.site.register(Wine)
admin.site.register(WineColor)
admin.site.register(WineTaste)
admin.site.register(Country)