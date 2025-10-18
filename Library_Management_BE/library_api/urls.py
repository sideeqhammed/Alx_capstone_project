from django.urls import path
from . import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
  path('login/', LoginView.as_view(template_name='library_api/login.html'), name='login'),
  path('logout/', LogoutView.as_view(next_page='library_api/login.html'), name='logout'),
  path('register/', views.register, name='register'),
  path('books/', views.BookListApiView.as_view(), name='book_list'),
  path('books/<int:pk>', views.BookDetailApiView.as_view(), name='book_detail'),
  path('books/create', views.BookCreateApiView.as_view(), name='book_create'),
  path('books/<int:pk>/update', views.BookUpdateApiView.as_view(), name='book_update'),
  path('books/<int:pk>/delete', views.BookDeleteApiView.as_view(), name='book_delete'),

  path('books/<int:pk>/book_checkout', views.BookCheckoutView.as_view(), name='book_checkout'),
  path('books/<int:pk>/book_return', views.BookReturnview.as_view(), name='book_return'),
  path('books/borrow_records', views.BookBorrowRecordListView.as_view(), name='book_record_list'),

  path('authors/', views.AuthorListApiView.as_view(), name='author_list'),
  path('authors/<int:pk>', views.AuthorDetailApiView.as_view(), name='author_detail'),
  path('authors/create', views.AuthorCreateApiView.as_view(), name='author_create'),
  path('authors/<int:pk>/update', views.AuthorUpdateApiView.as_view(), name='author_update'),
  path('authors/<int:pk>/delete', views.AuthorDeleteApiView.as_view(), name='author_delete'),
]