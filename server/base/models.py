from django.db import models

from django.core.validators import RegexValidator

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    SHOP_MANAGER = 1
    CUSTOMER = 2

    ROLE_CHOICES = (
        (SHOP_MANAGER, 'Menedżer'),
        (CUSTOMER, 'Klient')
    )

    email = models.EmailField()
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=CUSTOMER)

    def __str__(self):
        return self.username


class Country:
    code = models.CharField(primary_key=True, max_length=2, validators=[
        RegexValidator(r'^[A-Z]{2}$', 'Country code consists of 2 capital letters.')])
    
    name = models.CharField(validators=[
        RegexValidator(r'^[A-Za-z]*$', 'Country name can only contain letters.')
    ])

    def __str__(self):
        return self.code


class WineColor:
    color = models.CharField(validators=[
        RegexValidator(r'^[A-Za-z]*$', 'Product type can only contain letters and a frontslash.')
    ])

    def __str__(self):
        return self.color


class WineTaste:
    taste = models.CharField(validators=[
        RegexValidator(r'^[A-Za-z]*$', 'Product type can only contain letters and a frontslash.')
    ])

    def __str__(self):
        return self.taste


class Wine:
    name = models.CharField(validators=[
        RegexValidator(r'^[A-Za-z]*$', 'Product name can only contain letters.')
    ])

    description = models.TextField()
    image_url = models.CharField()
    country = models.ForeignKey("Country", on_delete=models.PROTECT)
    color = models.ForeignKey("WineColor", on_delete=models.PROTECT)
    taste = models.ForeignKey("WineTaste", on_delete=models.PROTECT)
    year = models.PositiveSmallIntegerField()
    price = models.DecimalField(max_digits=9, decimal_places=2)
    units_in_stock = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name


class Review:
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    wine = models.ForeignKey("Wine", on_delete=models.CASCADE, related_name="reviews")
    created = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)

    def __str__(self):
        return f"[{self.user.username}] {self.content}"
    

class Order:
    user = models.ForeignKey("User", on_delete=models.PROTECT)
    date = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField()
    last_name = models.CharField()
    address = models.CharField()
    city = models.CharField()
    zip_code = models.CharField()
    country = models.CharField()
    phone_number = models.CharField()
    email = models.EmailField()


class OrderDetails:
    order = models.ForeignKey("Order", on_delete=models.CASCADE)
    wine = models.ForeignKey("Wine", on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField()
    unit_price = models.DecimalField(max_digits=9, decimal_places=2)