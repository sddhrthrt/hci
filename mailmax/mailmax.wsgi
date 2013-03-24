import sys
sys.path.insert(0, '/var/www/hci/mailmax')
sys.stdout = sys.stderr
from mailmax import app as application
