from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, DestroyAPIView
from .models import Book
from .serializer import BookSerializer
from rest_framework.permissions import AllowAny, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

# Create your views here.

class BookListApiView(ListAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [AllowAny]

  filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
  filterset_fields = ['title', 'author__name', 'year_published']
  search_fields = ['title', 'author__name', 'isbn']
  ordering_fields = ['title', 'year_published']

class BookDetailApiView(RetrieveAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [AllowAny]

class BookCreateApiView(CreateAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [IsAdminUser]

class BookUpdateApiView(UpdateAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [IsAdminUser]

class BookDeleteApiView(DestroyAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [IsAdminUser]