from rest_framework import serializers
from .models import Book, Author, BorrowRecord

class BookSerializer(serializers.ModelSerializer):
  class Meta:
    model = Book
    fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
  books = BookSerializer(many=True, read_only = True)

  class Meta:
    model = Author
    fields = ['name', 'book']

class BorrowRecordSerializer(serializers.ModelSerializer):
  user = serializers.StringRelatedField(read_only = True)
  book = serializers.StringRelatedField(read_only = True)

  class Meta:
    model = BorrowRecord
    fields = '__all__'