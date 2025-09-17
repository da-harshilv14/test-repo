from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSignupSerializer
from .models import CustomUser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .serializers import UserSignupSerializer
from rest_framework import serializers


class FarmerSignupView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSignupSerializer
    permission_classes = [permissions.AllowAny]


class CustomTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid credentials")

        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "fullname": user.fullname,
                "email": user.email,
                "phoneno": user.phoneno,
                "role": user.role,
            },
        }


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    serializer = UserSignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")
    role = request.data.get("role")  # optional, if role-based auth is needed

    user = authenticate(username=email, password=password)
    if user:
        return Response({"message": "Login successful", "user": UserSerializer(user).data})
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
