import endpoints

from google.appengine.ext import ndb
from protorpc import remote

from endpoints_proto_datastore.ndb import EndpointsModel

class CarModel(EndpointsModel):
  _message_fields_schema = ('id', 'description', 'isSold', 'bought')

  description = ndb.StringProperty(indexed=False)
  isSold = ndb.BooleanProperty(default=False)
  bought = ndb.DateTimeProperty(auto_now_add=True)

@endpoints.api(name='car', version='v1', description='REST API for Cars')
class CarV1(remote.Service):

  @CarModel.method(path='cars/{id}', http_method='GET', name='cars.get')
  def CarGet(self, car):
    if not car.from_datastore:
      raise endpoints.NotFoundException('Car not found.')
    return car

  @CarModel.method(path='cars/{id}', http_method='DELETE', name='cars.remove')
  def CarRemove(self, car):
    if not car.from_datastore:
      raise endpoints.NotFoundException('Car not found.')
    car.key.delete()
    return car

  @CarModel.method(path='cars', http_method='POST', name='cars.insert')
  def CarInsert(self, car):
    car.put()
    return car

  @CarModel.method(path='cars/{id}', http_method='PUT', name='cars.update')
  def CarUpdate(self, car):
    car.put()
    return car

  @CarModel.query_method(path='cars', name='cars.list')
  def CarList(self, query):
    return query
