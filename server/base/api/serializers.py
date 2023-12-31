from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import serializers
from base.models import Wine, WineTaste, WineColor, Country

from random import randint

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role
        return token

class WineTasteSerializer(serializers.ModelSerializer):
    class Meta:
        model = WineTaste
        fields = '__all__'

class WineColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = WineColor
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class WineSerializer(serializers.ModelSerializer):
    taste = WineTasteSerializer(many=False, read_only=True)
    color = WineColorSerializer(many=False, read_only=True)
    country = CountrySerializer(many=False, read_only=True)

    # Only for testing
    rating = serializers.DecimalField(max_digits=2, decimal_places=1, read_only=True, default=lambda: randint(0, 50) / 10)

    taste_id = serializers.SlugRelatedField(source='taste', queryset=WineTaste.objects.all(), slug_field='id', many=False, write_only=True)
    color_id = serializers.SlugRelatedField(source='color', queryset=WineColor.objects.all(), slug_field='id', many=False, write_only=True)
    country_id = serializers.SlugRelatedField(source='country', queryset=Country.objects.all(), slug_field='code', many=False, write_only=True)

    class Meta:
        model = Wine
        fields = ["id", "name", "description", "image_url",  "taste_id", "taste", "color_id", "color", "country_id", "country", "year", "price", "units_in_stock", "rating", "alcohol", "volume"]