from django.urls import path, include

urlpatterns = [
    path('api/storage/', include('storage.urls')),
]
