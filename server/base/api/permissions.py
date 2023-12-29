from rest_framework import permissions
from base.models import User

class IsManagerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow only the manager to create/update/delete objects.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return request.user.is_authenticated and request.user.role == User.SHOP_MANAGER

class OrderPermission(permissions.BasePermission):
    """
    Custom permission to allow authenticated users to create orders. Updating/deleting can be done by a client that made an order or a manager.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        return request.user.role == User.SHOP_MANAGER or obj.user == request.user
    
class OrderDetailsPermission(permissions.BasePermission):
    """
    Custom permission to allow only the client that made an order and a manager to modify order details.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        return request.user.role == User.SHOP_MANAGER or obj.order.user == request.user