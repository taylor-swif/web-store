from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin

class MyUserAdmin(UserAdmin):
    model = User

    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('role',)}),
    )

admin.site.register(User, MyUserAdmin)