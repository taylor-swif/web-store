from django.db import models
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

    
