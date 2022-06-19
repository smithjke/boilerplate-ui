import { ClientRxjsCrudService } from '~/1st-react-rxjs-crud';
import { User } from '~/api';
import { useApi } from '~/app';

export class UserService extends ClientRxjsCrudService<User> {
  protected crudClient = useApi().user;
}
