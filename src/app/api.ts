import { createUseApi } from '~/1st-api';
import { AppAuthClient, AppSessionClient, AppUserClient } from './clients';

export const useApi = createUseApi(() => ({
  auth: new AppAuthClient(),
  session: new AppSessionClient(),
  user: new AppUserClient(),
}));
