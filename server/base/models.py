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


class Country(models.Model):
    code = models.CharField(primary_key=True, max_length=2, validators=[
        RegexValidator(r'^[A-Z]{2}$', 'Country code consists of 2 capital letters.')])
    
    name = models.CharField(max_length=50, validators=[
        RegexValidator(r'^[A-Za-z]*$', 'Country name can only contain letters.')
    ])

    def __str__(self):
        return self.code


class WineColor(models.Model):
    color = models.CharField(max_length=30, validators=[
        RegexValidator(r'^[A-Za-z]*$', 'Product type can only contain letters and a frontslash.')
    ])

    def __str__(self):
        return self.color


class WineTaste(models.Model):
    taste = models.CharField(max_length=30, validators=[
        RegexValidator(r'^[A-Za-z]*$', 'Product type can only contain letters and a frontslash.')
    ])

    def __str__(self):
        return self.taste


class Wine(models.Model):
    name = models.CharField(max_length=50, validators=[
        RegexValidator(r'^[A-Za-z]*$', 'Product name can only contain letters.')
    ])

    description = models.TextField()
    image_url = models.CharField(max_length=200)
    country = models.ForeignKey("Country", on_delete=models.PROTECT)
    color = models.ForeignKey("WineColor", on_delete=models.PROTECT)
    taste = models.ForeignKey("WineTaste", on_delete=models.PROTECT)
    year = models.PositiveSmallIntegerField()
    price = models.DecimalField(max_digits=9, decimal_places=2)
    units_in_stock = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name


class Review(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    wine = models.ForeignKey("Wine", on_delete=models.CASCADE, related_name="reviews")
    created = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)

    def __str__(self):
        return f"[{self.user.username}] {self.content}"
    

class Order(models.Model):
    user = models.ForeignKey("User", on_delete=models.PROTECT)
    date = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()


class OrderDetails(models.Model):
    order = models.ForeignKey("Order", on_delete=models.CASCADE)
    wine = models.ForeignKey("Wine", on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField()
    unit_price = models.DecimalField(max_digits=9, decimal_places=2)