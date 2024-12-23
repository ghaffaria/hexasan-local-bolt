"""ZFS storage management utilities"""
import logging
import re
from .command import run_command
from .disk_utils import get_disk_list

logger = logging.getLogger(__name__)

def get_used_disks():
    """Get list of disks that are already used in pools"""
    try:
        output = run_command('zpool status')
        if not output:
            return set()

        # Regular expression to match disk identifiers
        disk_pattern = re.compile(r'(?:c\d+t\d+d\d+)')
        
        # Find all disk identifiers in the output
        used_disks = set(disk_pattern.findall(output))
        
        return used_disks
        
    except Exception as e:
        logger.error(f"Error getting used disks: {str(e)}")
        return set()

def get_available_disks():
    """Get list of available disks (not used in pools)"""
    try:
        all_disks = get_disk_list()
        used_disks = get_used_disks()
        
        # Filter out used disks
        available_disks = [
            disk for disk in all_disks 
            if disk['id'] not in used_disks
        ]
        
        return available_disks
    except Exception as e:
        logger.error(f"Error getting available disks: {str(e)}")
        return []

def get_pools():
    """Get list of ZFS pools"""
    try:
        output = run_command('zpool list -H -o name,size,allocated,free,health')
        if not output:
            return []

        pools = []
        for line in output.splitlines():
            if not line.strip():
                continue
            try:
                name, size, allocated, free, health = line.split('\t')
                pools.append({
                    'name': name,
                    'size': size,
                    'allocated': allocated,
                    'free': free,
                    'health': health
                })
            except ValueError as e:
                logger.error(f"Error parsing pool data: {str(e)}")
                continue

        return pools
    except Exception as e:
        logger.error(f"Error getting pools: {str(e)}")
        return []

def create_pool(name, vdev_type, disks, zfs_version='default'):
    """Create a new ZFS pool"""
    if vdev_type not in ['basic', 'mirror', 'raidz1', 'raidz2', 'raidz3']:
        raise ValueError("Invalid vdev type")
        
    # Check if any of the selected disks are already in use
    used_disks = get_used_disks()
    conflicting_disks = [disk for disk in disks if disk in used_disks]
    
    if conflicting_disks:
        raise ValueError(f"The following disks are already in use: {', '.join(conflicting_disks)}")
        
    cmd = ['zpool', 'create']
    if zfs_version != 'default':
        cmd.extend(['-o', f'version={zfs_version}'])
        
    cmd.append(name)
    
    if vdev_type != 'basic':
        cmd.append(vdev_type)
        
    cmd.extend([f"/dev/dsk/{disk}" for disk in disks])
    
    try:
        output = run_command(' '.join(cmd))
        if output is None:
            raise Exception("Failed to create pool")
        return True
    except Exception as e:
        raise Exception(f"Failed to create pool: {str(e)}")
