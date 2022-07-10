import { ClientRxjsCrudService } from '~/1st-react-rxjs-crud';
import { api, User } from '~/api';

export class UserService extends ClientRxjsCrudService<User> {
  protected crudClient = api.user;
}
