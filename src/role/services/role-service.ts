import { ClientRxjsCrudService } from '~/1st-react-rxjs-crud';
import { api, Role } from '~/api';

export class RoleService extends ClientRxjsCrudService<Role> {
  protected crudClient = api.role;
}
