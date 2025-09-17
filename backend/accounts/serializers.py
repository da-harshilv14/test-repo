from rest_framework import serializers
from .models import CustomUser

class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["fullname", "email", "phoneno", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            fullname=validated_data["fullname"],
            email=validated_data["email"],
            phoneno=validated_data["phoneno"],
            password=validated_data["password"],
            role="farmer"
        )
        return user
