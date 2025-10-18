from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
# from django.contrib.auth.models import User
# from django.db.models.signals import post_save
# from django.dispatch import receiver

# Create your models here.

class Author(models.Model):
  name = models.CharField(max_length=64)

  def __str__(self):
    return (f'{self.name}')


class Book(models.Model):
  title = models.CharField(max_length=100)
  author = models.ForeignKey(Author, on_delete=models.CASCADE)
  isbn = models.IntegerField(unique=True)
  year_published = models.IntegerField()
  copies_available = models.IntegerField()

  class meta:
    permissions = [
      ("can_add_book", "Can add book"),
      ("can_update_book", "Can update book"),
      ("can_delete_book", "Can delete book"),
    ]

  def __str__(self):
    return (f'{self.title} by {self.author.name}')
  

class CustomUserManager(UserManager):
  def create_superuser(self, username, email, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    extra_fields.setdefault('role', 'Admin')

    return super().create_superuser(username, email, password, **extra_fields)

class CustomUser(AbstractUser):

  ROLE_CHOICES = [
    ('Admin', 'Admin'),
    ('Librarian', 'Librarian'),
    ('Member', 'Member'),
  ]

  email = models.EmailField(unique=True)
  role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Member')

  objects = CustomUserManager()

  def __str__(self):
    return (f'{self.username} - {self.role}')
    



# class UserProfile(models.Model):
  
#   # ROLE_CHOICES = [
#   #   ('Librarian', 'Librarian'),
#   #   ('Member', 'Member'),
#   # ]

#   user = models.OneToOneField(User, max_length=64, on_delete=models.CASCADE)
#   # role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Member')

#   def __str__(self):
#     return (f'{self.user.name} - {self.role}')

# @receiver(post_save, sender=User)
# def create_user(sender, instance, created, **kwargs):
#   if created:
#     UserProfile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def update_user(sender, instance, **kwargs):
#   try:
#     instance.userprofile.save()
#   except UserProfile.DoesNotExist:
#     pass
