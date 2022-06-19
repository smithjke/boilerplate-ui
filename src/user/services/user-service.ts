import { ClientCrudService } from '~/1st-crud';
import { User } from '~/api';
import { useApi } from '~/app';

export class UserService extends ClientCrudService<User> {
  protected crudClient = useApi().user;
}
