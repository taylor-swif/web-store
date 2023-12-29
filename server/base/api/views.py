from .serializers import MyTokenObtainPairSerializer, WineSerializer, CountrySerializer, WineColorSerializer, WineTasteSerializer
from .permissions import IsManagerOrReadOnly
from base.models import Wine, Country, WineColor, WineTaste

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

class WineColorViewSet(viewsets.ModelViewSet):
    queryset = WineColor.objects.all()
    serializer_class = WineColorSerializer
    permission_classes = (IsManagerOrReadOnly, )

class WineTasteViewSet(viewsets.ModelViewSet):
    queryset = WineTaste.objects.all()
    serializer_class = WineTasteSerializer
    permission_classes = (IsManagerOrReadOnly, )
