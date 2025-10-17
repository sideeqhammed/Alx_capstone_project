from django.urls import path
from . import views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
  path('', views.BookListApiView.as_view(), name='book_list'),
  path('login/', LoginView.as_view(), name='login'),
  path('logout/', LogoutView.as_view(), name='logout'),
  path('detail/<int:id>/', views.BookDetailApiView.as_view(), name='book_detail'),
  path('create/', views.BookCreateApiView.as_view(), name='book_create'),
  path('update/<int:id>/', views.BookUpdateApiView.as_view(), name='book_update'),
  path('delete/<int:id>/', views.BookDeleteApiView.as_view(), name='book_delete'),
]