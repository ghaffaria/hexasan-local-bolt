from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils.zfs import get_pools, get_available_disks, create_pool

class PoolListView(APIView):
    def get(self, request):
        """Get list of all pools"""
        try:
            pools = get_pools()
            return Response(pools)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class DiskListView(APIView):
    def get(self, request):
        """Get list of available disks"""
        try:
            disks = get_available_disks()
            return Response(disks)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class CreatePoolView(APIView):
    def post(self, request):
        """Create a new ZFS pool"""
        try:
            name = request.data.get('poolName')
            vdev_type = request.data.get('vdevType')
            selected_disks = request.data.get('selectedDisks')
            zfs_version = request.data.get('zfsVersion')

            if not all([name, vdev_type, selected_disks]):
                return Response(
                    {'error': 'Missing required fields'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            create_pool(name, vdev_type, selected_disks, zfs_version)
            return Response({'message': f'Pool {name} created successfully'})
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
