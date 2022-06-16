import { createApi } from '~/1st-api';
import { AppAuthClient, AppUserClient } from '~/app/clients';

export const appApi = createApi({
  auth: new AppAuthClient(),
  user: new AppUserClient(),
});
