from rest_framework import serializers
from .models import Book, Author, BorrowRecord
from django.utils import timezone
from django.forms import ValidationError
from django.contrib.auth import get_user_model

class BookSerializer(serializers.ModelSerializer):
  author = serializers.StringRelatedField()
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


User = get_user_model()
class UserCreateSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)

  def create(self, validated_data):
    user = User.objects.create_user(
      username=validated_data['username'],
      email=validated_data['email'],
      password=validated_data['password'],
    )
    return user

  class Meta:
    model = User
    fields = ['username', 'email', 'password']