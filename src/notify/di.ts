import { getDependency } from '~/1st-di';
import { NotifyService } from './services';

export const useNotifyService = () => getDependency<NotifyService>('NOTIFY_SERVICE');
