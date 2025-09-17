from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("email", "fullname", "phoneno", "role", "is_staff", "is_active")
    list_filter = ("role", "is_staff", "is_active")
    fieldsets = (
        (None, {"fields": ("email", "fullname", "phoneno", "password", "role")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "fullname", "phoneno", "password1", "password2", "role", "is_staff", "is_active"),
        }),
    )
    search_fields = ("email", "fullname", "phoneno")
    ordering = ("email",)


admin.site.register(CustomUser, CustomUserAdmin)
