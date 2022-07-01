import { createUseApi } from '~/1st-api';
import {
  AppAuthClient,
  AppRoleClient,
  AppSessionClient,
  AppUserClient,
} from './clients';

export const useApi = createUseApi(() => ({
  auth: new AppAuthClient(),
  role: new AppRoleClient(),
  session: new AppSessionClient(),
  user: new AppUserClient(),
}));
