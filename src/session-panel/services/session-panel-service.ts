import { ClientRxjsCrudService } from '~/1st-react-rxjs-crud';
import { api, Session } from '~/api';

export class SessionPanelService extends ClientRxjsCrudService<Session> {
  protected crudClient = api.session;
}
