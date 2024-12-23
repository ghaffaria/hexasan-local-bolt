from django.urls import path
from .views import PoolListView, DiskListView, CreatePoolView

urlpatterns = [
    path('pools/', PoolListView.as_view(), name='pool-list'),
    path('disks/', DiskListView.as_view(), name='disk-list'),
    path('pools/create/', CreatePoolView.as_view(), name='create-pool'),
]
