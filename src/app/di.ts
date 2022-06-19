import { getDependency } from '~/1st-di';
import { AppSessionService } from './services';

export const useAppSessionService = () => getDependency<AppSessionService>('SESSION_SERVICE');
