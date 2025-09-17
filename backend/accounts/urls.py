from django.urls import path
from .views import FarmerSignupView, register_user, login_user, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("signup/", FarmerSignupView.as_view(), name="farmer_signup"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api/register/", register_user, name="register"),
    path("api/signin/", login_user, name="signin"),
]

