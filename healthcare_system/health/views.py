## healthcare/views.py
from rest_framework import generics
from .models import MedicalRecord, Appointment
from .serializers import MedicalRecordSerializer, AppointmentSerializer
from rest_framework.permissions import IsAuthenticated

class MedicalRecordListCreateView(generics.ListCreateAPIView):
    serializer_class = MedicalRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return MedicalRecord.objects.filter(patient=self.request.user)

class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user)