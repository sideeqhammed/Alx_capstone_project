from rest_framework.permissions import BasePermission

class IsLibrarian(BasePermission):
  def has_permission(self, request, view):
    return request.user.is_authenticated and request.user.role == 'librarian'
  
class IsAdminOrLibrarian(BasePermission):
  def has_permission(self, request, view):
    user = request.user
    return bool(user and user.is_authenticated and (user.is_staff or user.is_superuser or user.role == 'librarian'))