import os

from google.appengine.ext import vendor

vendor.add(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'server'))
vendor.add(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'server', 'lib'))
