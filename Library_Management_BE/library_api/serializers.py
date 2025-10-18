from rest_framework import serializers
from .models import Book, Author, BorrowRecord
from django.utils import timezone
from django.forms import ValidationError

class BookSerializer(serializers.ModelSerializer):
  added_by = serializers.CharField(source='added_by.username', read_only=True)

  def validate(self, value):
    current_year = timezone.now().year
    if value['year_published'] < 1450 or value['year_published'] > current_year:
      raise ValidationError("Enter a valid publication year.")
    return value

  class Meta:
    model = Book
    fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
  books = BookSerializer(many=True, read_only = True)

  class Meta:
    model = Author
    fields = ['name', 'books']

class BorrowRecordSerializer(serializers.ModelSerializer):
  user = serializers.StringRelatedField(read_only = True)
  book = serializers.StringRelatedField(read_only = True)

  class Meta:
    model = BorrowRecord
    fields = '__all__'