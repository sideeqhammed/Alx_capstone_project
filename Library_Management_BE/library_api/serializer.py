from rest_framework import serializers
from .models import Book, Author

class BookSerializer(serializers.ModelSerializer):
  class meta:
    model = Book
    fields = ['title', 'author', 'isbn', 'year_published', 'copies_available']

class AuthorSerializer(serializers.ModelSerializer):
  books = BookSerializer(many=True, read_only = True)

  class meta:
    model = Author
    fields = ['name', 'book']
