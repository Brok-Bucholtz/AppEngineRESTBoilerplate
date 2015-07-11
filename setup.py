import os
import shutil

submoduleDirectory = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'submodules')
serverLibDirectory = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'app', 'server', 'lib')

shutil.copytree(
    os.path.join(submoduleDirectory, 'endpoints-proto-datastore', 'endpoints_proto_datastore'),
    os.path.join(serverLibDirectory, 'endpoints_proto_datastore'))
