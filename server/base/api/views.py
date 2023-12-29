from .serializers import MyTokenObtainPairSerializer, WineSerializer, CountrySerializer
from .permissions import IsManagerOrReadOnly
from base.models import Wine, Country

from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import viewsets, permissions
from rest_framework.response import Response

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class WineViewSet(viewsets.ModelViewSet):
    queryset = Wine.objects.all()
    serializer_class = WineSerializer
    permission_classes = (IsManagerOrReadOnly, )

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = (IsManagerOrReadOnly, )
