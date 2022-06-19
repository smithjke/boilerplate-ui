import { createUseApi } from '~/1st-api';
import { AppAuthClient, AppUserClient } from './clients';

export const useApi = createUseApi(() => ({
  auth: new AppAuthClient(),
  user: new AppUserClient(),
}));
