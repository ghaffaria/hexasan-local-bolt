"""Common command execution utilities"""
import subprocess
import logging

logger = logging.getLogger(__name__)

def run_command(command):
    """Execute a command safely"""
    try:
        # For format command with enumeration
        if command == 'format':
            process = subprocess.Popen(
                ['pfexec', 'format', '<<EOF\n0\nquit\nEOF\n'],
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            output, error = process.communicate()
            if error:
                logger.error(f"Format command error: {error}")
            return output
        
        # For other commands
        process = subprocess.run(
            ['pfexec'] + command.split(),
            capture_output=True,
            text=True
        )
        if process.stderr:
            logger.error(f"Command error: {process.stderr}")
        return process.stdout.strip()
        
    except subprocess.CalledProcessError as e:
        logger.error(f"Command failed: {str(e)}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return None
