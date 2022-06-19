import { getDependency } from '~/1st-di';
import { SessionPanelService } from './services';

export const useSessionPanelService = () => getDependency<SessionPanelService>('SESSION_PANEL_SERVICE');
