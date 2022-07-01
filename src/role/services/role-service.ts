import { ClientRxjsCrudService } from '~/1st-react-rxjs-crud';
import { Role } from '~/api';
import { useApi } from '~/app';

export class RoleService extends ClientRxjsCrudService<Role> {
  protected crudClient = useApi().role;
}
