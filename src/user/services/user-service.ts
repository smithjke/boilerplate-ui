import { ClientCrudService } from '~/1st-crud';
import { User } from '~/api';
import { appApi } from '~/app';

export class UserService extends ClientCrudService<User> {
  protected crudClient = appApi.user;
}
