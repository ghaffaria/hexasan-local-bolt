"""Disk utilities for storage management"""
import re
import logging
from .command import run_command

logger = logging.getLogger(__name__)

def get_disk_list():
    """Get list of all physical disks"""
    try:
        # Get all physical disks
        all_disks = []
        
        # First try using iostat
        output = run_command('iostat -En')
        if output:
            all_disks = parse_iostat_output(output)
        else:
            # Fallback to format command
            output = run_command('format')
            if output:
                all_disks = parse_format_output(output)
        
        return all_disks
            
    except Exception as e:
        logger.error(f"Error getting disk list: {str(e)}")
        return []

def parse_iostat_output(output):
    """Parse iostat command output"""
    disks = []
    current_disk = None
    
    for line in output.splitlines():
        if line.startswith('c'):
            disk_match = re.match(r'(c\d+t\d+d\d+)', line)
            if disk_match:
                current_disk = disk_match.group(1)
                if not any(d['id'] == current_disk for d in disks):
                    disks.append({
                        'id': current_disk,
                        'name': f"/dev/dsk/{current_disk}",
                        'status': 'available'
                    })
    
    return disks

def parse_format_output(output):
    """Parse format command output"""
    disks = []
    disk_pattern = re.compile(r'\s*\d+\.\s+(c\d+t\d+d\d+)\s+.*')
    
    for line in output.splitlines():
        match = disk_pattern.match(line)
        if match:
            disk_id = match.group(1)
            if not any(d['id'] == disk_id for d in disks):
                disks.append({
                    'id': disk_id,
                    'name': f"/dev/dsk/{disk_id}",
                    'status': 'available'
                })
    
    return disks
