import { useStorageRepository } from '~/1st-core';
import { UserRestClient } from '~/api';
import { appConfig } from '../common';

export class AppUserClient extends UserRestClient {
  protected transformHeaders(headers: HeadersInit): HeadersInit {
    return {
      ...headers,
      ['session-token']: useStorageRepository().getItem(appConfig.session.storageKey),
    };
  }
}
