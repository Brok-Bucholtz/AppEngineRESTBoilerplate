import endpoints

from car import CarV1
from user import UserV1

APPLICATION = endpoints.api_server([CarV1, UserV1], restricted=False)
