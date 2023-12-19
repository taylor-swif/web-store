from django.urls import path
from .views import MyTokenObtainPairView #, get_profile
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # path('profile/', get_profile),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]