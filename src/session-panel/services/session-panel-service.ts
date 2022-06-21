import { ClientRxjsCrudService } from '~/1st-react-rxjs-crud';
import { Session } from '~/api';
import { useApi } from '~/app';

export class SessionPanelService extends ClientRxjsCrudService<Session> {
  protected crudClient = useApi().session;
}
