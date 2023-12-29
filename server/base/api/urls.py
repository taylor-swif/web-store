from django.urls import path
from django.conf.urls import include
from .views import MyTokenObtainPairView, WineViewSet, CountryViewSet, WineTasteViewSet, WineColorViewSet
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'wines', WineViewSet)
router.register(r'countries', CountryViewSet)
router.register(r'wine_tastes', WineTasteViewSet)
router.register(r'wine_colors', WineColorViewSet)

urlpatterns = [
    # path('profile/', get_profile),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('', include(router.urls)),
]