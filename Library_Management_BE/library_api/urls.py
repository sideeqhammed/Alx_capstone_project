from django.urls import path
from . import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
  path('', views.BookListApiView.as_view(), name='book_list'),
  path('login/', LoginView.as_view(), name='login'),
  path('logout/', LogoutView.as_view(), name='logout'),
  path('<int:pk>/detail', views.BookDetailApiView.as_view(), name='book_detail'),
  path('create', views.BookCreateApiView.as_view(), name='book_create'),
  path('<int:pk>/update', views.BookUpdateApiView.as_view(), name='book_update'),
  path('<int:pk>/delete', views.BookDeleteApiView.as_view(), name='book_delete'),
]