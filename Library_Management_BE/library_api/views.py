from django.shortcuts import render, redirect
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, DestroyAPIView, GenericAPIView
from .models import Book, BorrowRecord, Author
from .serializers import BookSerializer, AuthorSerializer, BorrowRecordSerializer
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .role_checks import IsAdminOrLibrarian
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.contrib.auth.forms import UserCreationForm

# Create your views here.

def register (request):
  if request.method == "POST":
    form = UserCreationForm(request.POST)
    if form.is_valid():
      user = form.save()
      return redirect('login')
  else:
    form = UserCreationForm()

  context = {'form':form}

  return render(request, 'library_api/register.html', context)



class BookListApiView(ListAPIView):
  serializer_class = BookSerializer
  permission_classes = [AllowAny]

  filter_backends = [SearchFilter, OrderingFilter]
  search_fields = ['title', 'author__name', 'isbn']
  ordering_fields = ['title', 'year_published']

  def get_queryset(self):
    queryset = Book.objects.all()
    available = self.request.query_params.get('available')
    if available:
      queryset = Book.objects.filter(available_copies__gt = 0)
    return queryset


class BookDetailApiView(RetrieveAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [AllowAny]

class BookCreateApiView(CreateAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [IsAdminUser, IsAdminOrLibrarian]

  def perform_create(self, serializer):
    serializer.save(added_by=self.request.user)

class BookUpdateApiView(UpdateAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [IsAdminUser, IsAdminOrLibrarian]

class BookDeleteApiView(DestroyAPIView):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [IsAdminUser, IsAdminOrLibrarian]


class BookBorrowRecordListView(ListAPIView):
  queryset = BorrowRecord.objects.all()
  serializer_class = BorrowRecordSerializer
  permission_classes = [IsAuthenticated, IsAdminOrLibrarian]

class BookCheckoutView(GenericAPIView):
  queryset = BorrowRecord.objects.all()
  permission_classes = [IsAuthenticated]
  serializer_class = BorrowRecordSerializer

  def post(self, request, pk):
    try:
      book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
      return Response({'error' : "Book not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if book.available_copies <= 0:
      return Response({'error': 'No copies available'}, status=status.HTTP_400_BAD_REQUEST)
    
    already_borrowed = BorrowRecord.objects.filter(user=request.user, book=book, return_date__isnull = True).exists()
    if already_borrowed:
      return Response({'error' : 'You have already borrowed this book'}, status=status.HTTP_400_BAD_REQUEST)
    
    BorrowRecord.objects.create(user=request.user, book=book)
    book.available_copies -= 1
    book.save()

    return Response({'message': f'You have checked out "{book.title}"'}, status=status.HTTP_200_OK)
  

class BookReturnview(GenericAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = BorrowRecordSerializer

  def post(self, request, pk):
    try:
      book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
      return Response({'error' : 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
      record = BorrowRecord.objects.get(user=request.user, book=book, return_date__isnull=True)
    except BorrowRecord.DoesNotExist:
      return Response({'error': 'You have not borrowed this book'}, status=status.HTTP_400_BAD_REQUEST)
    
    record.return_date = timezone.now()
    record.save()

    book.available_copies += 1
    book.save()

    return Response({'message': f'You have returned "{book.title}"'}, status=status.HTTP_200_OK)
  

class AuthorListApiView(ListAPIView):
  queryset = Author.objects.all()
  serializer_class = AuthorSerializer
  permission_classes = [AllowAny]

class AuthorDetailApiView(RetrieveAPIView):
  queryset = Author.objects.all()
  serializer_class = AuthorSerializer
  permission_classes = [AllowAny]

class AuthorCreateApiView(CreateAPIView):
  queryset = Author.objects.all()
  serializer_class = AuthorSerializer
  permission_classes = [IsAuthenticated, IsAdminOrLibrarian]

class AuthorUpdateApiView(UpdateAPIView):
  queryset = Author.objects.all()
  serializer_class = AuthorSerializer
  permission_classes = [IsAuthenticated, IsAdminOrLibrarian]

class AuthorDeleteApiView(DestroyAPIView):
  queryset = Author.objects.all()
  serializer_class = AuthorSerializer
  permission_classes = [IsAuthenticated, IsAdminOrLibrarian]