## authentication/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_doctor', 'is_patient')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_doctor = serializers.BooleanField(default=False)
    is_patient = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "is_doctor", "is_patient"]

    def validate(self, data):
        """
        Ensure that the user selects either 'is_doctor' or 'is_patient' but not both.
        """
        if data.get("is_doctor") and data.get("is_patient"):
            raise serializers.ValidationError("A user cannot be both a doctor and a patient.")
        if not data.get("is_doctor") and not data.get("is_patient"):
            raise serializers.ValidationError("You must select either 'Doctor' or 'Patient'.")

        return data

    def create(self, validated_data):
        """
        Create a new user with the validated data.
        """
        password = validated_data.pop("password")  # Extract password before creating user
        user = User.objects.create_user(**validated_data)  # Create user without password first
        user.set_password(password)  # Hash the password
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = User.objects.filter(username=data["username"]).first()

        if not user:
            raise serializers.ValidationError("User does not exist.")

        if not user.check_password(data["password"]):
            raise serializers.ValidationError("Invalid credentials.")

        return user