from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, fullname, email, phoneno, password=None, role="farmer"):
        if not email:
            raise ValueError("Users must have an email address")
        if not phoneno:
            raise ValueError("Users must have a phone number")

        email = self.normalize_email(email)
        user = self.model(fullname=fullname, email=email, phoneno=phoneno, role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, fullname, email, phoneno, password=None):
        user = self.create_user(fullname, email, phoneno, password, role="admin")
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ("farmer", "Farmer"),
        ("officer", "Officer"),
        ("admin", "Admin"),
    )

    fullname = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    phoneno = models.CharField(max_length=15, unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="farmer")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["fullname", "phoneno"]

    def __str__(self):
        return f"{self.fullname} ({self.role})"
