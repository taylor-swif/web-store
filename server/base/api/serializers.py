from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import serializers
from base.models import Wine, WineTaste, WineColor, Country, User, Order, OrderDetails, Review

from random import randint

from django.db.models import Avg

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

    rating = serializers.SerializerMethodField()
    number_of_reviews = serializers.SerializerMethodField()

    taste_id = serializers.SlugRelatedField(source='taste', queryset=WineTaste.objects.all(), slug_field='id', many=False, write_only=True)
    color_id = serializers.SlugRelatedField(source='color', queryset=WineColor.objects.all(), slug_field='id', many=False, write_only=True)
    country_id = serializers.SlugRelatedField(source='country', queryset=Country.objects.all(), slug_field='code', many=False, write_only=True)

    def get_rating(self, obj):
        reviews = Review.objects.filter(wine=obj)
        return reviews.aggregate(average=Avg("rating", default=0))["average"]

    def get_number_of_reviews(self, obj):
        reviews = Review.objects.filter(wine=obj)
        return reviews.count()

    class Meta:
        model = Wine
        fields = ["id", "name", "description", "image_url",  "taste_id", "taste", "color_id", "color", "country_id", "country", "year", "price", "units_in_stock", "rating", "alcohol", "volume", "number_of_reviews"]

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email"]

        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class OrderDetailsSerializer(serializers.ModelSerializer):
    wine_id = serializers.SlugRelatedField(source='wine', queryset=Wine.objects.all(), slug_field='id', many=False)
    
    def validate(self, attrs):
        if attrs.get('wine').price != attrs.get('unit_price'):
            raise serializers.ValidationError({"price": "Current price of this wine is different!"})
        return super().validate(attrs)
    
    class Meta:
        model = OrderDetails
        fields = ["wine_id", "quantity", "unit_price"]

class ReviewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]

class OrderSerializer(serializers.ModelSerializer):
    order_details = OrderDetailsSerializer(source='orderdetails_set', many=True)
    user = ReviewUserSerializer(read_only=True)

    def create(self, validated_data):
        order_data = validated_data.copy()
        order_data.pop('orderdetails_set')
        order_data['user'] = self.context['request'].user

        order = Order.objects.create(**order_data)
        for order_detail_data in validated_data.get('orderdetails_set'):
            order_detail_data['order'] = order
            order_detail = OrderDetails.objects.create(**order_detail_data)
            order_detail.save()
        return order
    
    def update(self, instance, validated_data):
        order_data = validated_data.copy()
        order_data.pop('orderdetails_set')
        order_data['user'] = self.context['request'].user

        Order.objects.filter(pk=instance.pk).update(**order_data)
        OrderDetails.objects.filter(order=instance).delete()

        for order_detail_data in validated_data.get('orderdetails_set'):
            order_detail_data['order'] = instance
            order_detail = OrderDetails.objects.create(**order_detail_data)
            order_detail.save()
        return instance

    class Meta:
        model = Order
        fields = ["id", "user", "date", "first_name", "last_name", "address", "city", "zip_code", "country", "phone_number", "email", "order_details"]

class UserProfileSerializer(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField(read_only=True)
    role = serializers.CharField(source='get_role_display', read_only=True)

    def get_orders(self, obj):
        orders = Order.objects.filter(user=obj)
        return OrderSerializer(orders, many=True).data

    class Meta:
        model = User
        fields = ["id", "username", "email", "orders", "role"]

class ChangePasswordSerializer(serializers.Serializer):
    model = User

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ChangeUsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]

class UserRoleSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES)

class FavoriteWineSerializer(serializers.Serializer):
    pass

class FavoriteWinesSerializer(serializers.ModelSerializer):
    favorite_wines = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['favorite_wines']

class ReviewSerializer(serializers.ModelSerializer):
    user = ReviewUserSerializer(read_only=True)
    # user_id =  serializers.SlugRelatedField(source='user', queryset=User.objects.all(), slug_field='id', many=False, write_only=True)
    class Meta:
        model = Review
        fields = ["id", "user", "created", "content", "rating"]