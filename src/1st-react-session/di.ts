import { getDependency } from '~/1st-di';
import { SessionService } from './services';

export const useSessionService = () => getDependency<SessionService>('SESSION_SERVICE');
