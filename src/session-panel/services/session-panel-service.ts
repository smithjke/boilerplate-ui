import { ClientRxjsCrudService } from '~/1st-react-rxjs-crud';
import { User } from '~/api';
import { useApi } from '~/app';

export class SessionPanelService extends ClientRxjsCrudService<User> {
  protected crudClient = useApi().session;
}
