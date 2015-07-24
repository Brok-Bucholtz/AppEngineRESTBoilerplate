import endpoints

from google.appengine.ext import ndb
from protorpc import remote

from endpoints_proto_datastore.ndb import EndpointsModel
from endpoints_proto_datastore.ndb import EndpointsAliasProperty

WEB_CLIENT_ID = '75603594494-t0bvn5ll6v1lgolb66g5cqqrksvllu4e.apps.googleusercontent.com'


class UserModel(EndpointsModel):
    _message_fields_schema = ('id', 'email')
    email = ndb.StringProperty()
    oauthUser = ndb.UserProperty()

    def IdSet(self, value):
        if not isinstance(value, basestring):
            raise TypeError('ID must be a string.')
        self.UpdateFromKey(ndb.Key(UserModel, value))

    @EndpointsAliasProperty(setter=IdSet, required=True)
    def id(self):
        if self.key is not None:
            return self.key.string_id()


@endpoints.api(name='user', version='v1', description='REST API for User',
               allowed_client_ids=[endpoints.API_EXPLORER_CLIENT_ID, WEB_CLIENT_ID],
               scopes=[endpoints.EMAIL_SCOPE])
class UserV1(remote.Service):
    @staticmethod
    def insert_user(user):
        if user.from_datastore:
            email = user.key.string_id()
            raise endpoints.BadRequestException(
                'UserModel of email %s already exists.' % (email,))

        user.oauthUser = endpoints.get_current_user()
        user.put()
        return user

    @staticmethod
    def check_user(user):
        if not user.from_datastore:
            raise endpoints.NotFoundException('User not found.')
        elif user.oauthUser != endpoints.get_current_user():
            raise endpoints.NotFoundException('oAuth user not allowed')

    @UserModel.method(path='users/{id}', http_method='GET', name='users.get', user_required=True)
    def UserGet(self, user):
        self.check_user(user)
        return user

    @UserModel.method(path='users/{id}', http_method='DELETE', name='users.remove', user_required=True)
    def UserRemove(self, user):
        self.check_user(user)
        user.key.delete()
        return user

    @UserModel.method(path='users', http_method='POST', name='users.insert', user_required=True)
    def UserInsert(self, user):
        return self.insert_user(user)

    @UserModel.method(path='users/{id}', http_method='PUT', name='users.update', user_required=True)
    def UserUpdate(self, user):
        self.check_user(user)
        user.oauthUser = endpoints.get_current_user()
        user.put()
        return user

    @UserModel.query_method(path='users', name='users.list', user_required=True)
    def UserList(self, query):
        return query.filter(UserModel.oauthUser == endpoints.get_current_user())

    @UserModel.method(path='login/{id}', http_method='GET', name='users.login', user_required=True)
    def LoginGet(self, user):
        if not user.from_datastore:
            return self.insert_user(user)
        elif user.oauthUser != endpoints.get_current_user():
            raise endpoints.NotFoundException('oAuth user not allowed')
        return user
