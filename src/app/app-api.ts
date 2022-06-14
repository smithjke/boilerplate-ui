import { createApi } from '~/1st-api';
import { AppUserClient } from '~/app/clients';

export const appApi = createApi({
  user: new AppUserClient(),
});
