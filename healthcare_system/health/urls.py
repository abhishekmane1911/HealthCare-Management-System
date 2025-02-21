# health/urls.py
from django.urls import path
from .views import MedicalRecordListCreateView, AppointmentListCreateView

urlpatterns = [
    path('records/', MedicalRecordListCreateView.as_view(), name='medical-records'),
    path('appointments/', AppointmentListCreateView.as_view(), name='appointments'),
]