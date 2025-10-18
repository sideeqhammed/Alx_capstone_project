from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Book, Author, CustomUser

# Register your models here.
admin.site.register(Book)
admin.site.register(Author)

class CustomUserAdmin(UserAdmin):
  model = CustomUser
  list_display = ('username', 'email', 'role', 'is_active', 'is_staff')
  list_filter = ('role', 'is_active', 'is_staff')
  fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )
admin.site.register(CustomUser, CustomUserAdmin)