from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.conf import settings

class UserAccountManager(BaseUserManager):
    def create_user(self,email,name,password=None):
        if not email:
            raise ValueError('User must have an email address')
        email=self.normalize_email(email)
        user=self.model(email=email,name=name)
        
        user.set_password(password)
        user.save()
        return user 
    def create_superuser(self, email, name, password=None):
        user = self.create_user(email, name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser,PermissionsMixin):
    email=models.EmailField(max_length=255,unique=True)
    name=models.CharField(max_length=255)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    # address=models.CharField(max_length=255,default='none')
    # country=models.CharField(max_length=255,default='India')
    # state=models.CharField(max_length=255,default='Gujarat')
    # city=models.CharField(max_length=255,default='Ahmedabad')
    
    objects =UserAccountManager()
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name']