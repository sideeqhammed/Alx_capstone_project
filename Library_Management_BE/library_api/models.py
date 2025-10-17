from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Author(models.Model):
  name = models.CharField(max_length=64)
  user = models.OneToOneField(User, on_delete=models.CASCADE)


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
  
