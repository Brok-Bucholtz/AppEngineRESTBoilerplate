import endpoints

from api.car import CarV1

APPLICATION = endpoints.api_server([CarV1], restricted=False)
